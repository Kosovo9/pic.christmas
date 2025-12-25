/**
 * COMPONENTES REDISEÑADOS - Navidad Festiva Premium
 * 
 * Este archivo contiene componentes reutilizables mejorados con:
 * - Estados visuales claros (default, hover, active, disabled)
 * - Animaciones suaves y micro-interacciones
 * - Accesibilidad WCAG AA
 * - Responsive design optimizado
 * - Tipografía jerárquica
 */

import React from 'react';
import { Loader2, X, AlertCircle, CheckCircle } from 'lucide-react';

// ============================================================================
// BUTTON COMPONENT - Botones Premium con Variantes
// ============================================================================

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
    size?: 'sm' | 'md' | 'lg' | 'xl';
    loading?: boolean;
    icon?: React.ReactNode;
    fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({
        variant = 'primary',
        size = 'md',
        loading = false,
        icon,
        fullWidth = false,
        className = '',
        children,
        disabled,
        ...props
    }, ref) => {
        const baseStyles = `
      font-sans font-bold rounded-premium transition-smooth
      focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-christmas-gold
      disabled:opacity-50 disabled:cursor-not-allowed
      inline-flex items-center justify-center gap-2
      ${fullWidth ? 'w-full' : ''}
    `;

        const sizeStyles = {
            sm: 'px-3 py-2 text-sm',
            md: 'px-6 py-3 text-base',
            lg: 'px-8 py-4 text-lg',
            xl: 'px-10 py-5 text-xl',
        };

        const variantStyles = {
            primary: `
        bg-gradient-red text-white
        hover:shadow-red hover:scale-105
        active:scale-95
        ${loading ? 'opacity-75' : ''}
      `,
            secondary: `
        bg-gradient-gold text-neutral-900
        hover:shadow-gold hover:scale-105
        active:scale-95
        font-bold
      `,
            outline: `
        border-2 border-christmas-gold text-christmas-gold
        hover:bg-christmas-gold hover:text-neutral-900
        active:scale-95
      `,
            ghost: `
        text-white hover:bg-white/10
        active:bg-white/20
      `,
            danger: `
        bg-red-600 text-white
        hover:bg-red-700 hover:scale-105
        active:scale-95
      `,
        };

        return (
            <button
                ref={ref}
                className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
                disabled={disabled || loading}
                {...props}
            >
                {loading ? (
                    <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        {children && <span>{children}</span>}
                    </>
                ) : (
                    <>
                        {icon && <span>{icon}</span>}
                        {children}
                    </>
                )}
            </button>
        );
    }
);

Button.displayName = 'Button';

// ============================================================================
// CARD COMPONENT - Tarjetas Premium con Profundidad
// ============================================================================

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: 'default' | 'elevated' | 'glass' | 'gradient';
    hover?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
    ({ variant = 'default', hover = true, className = '', children, ...props }, ref) => {
        const baseStyles = `
      rounded-premium-lg transition-smooth
      ${hover ? 'hover:shadow-premium-lg hover:scale-105' : ''}
    `;

        const variantStyles = {
            default: 'bg-neutral-900/50 border border-neutral-800 shadow-premium',
            elevated: 'bg-neutral-800 border border-neutral-700 shadow-premium-lg',
            glass: 'glass-effect shadow-premium',
            gradient: 'bg-gradient-festive/10 border border-christmas-gold/30 shadow-premium',
        };

        return (
            <div
                ref={ref}
                className={`${baseStyles} ${variantStyles[variant]} ${className}`}
                {...props}
            >
                {children}
            </div>
        );
    }
);

Card.displayName = 'Card';

// ============================================================================
// INPUT COMPONENT - Inputs Premium con Feedback Visual
// ============================================================================

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    success?: boolean;
    icon?: React.ReactNode;
    helperText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, success, icon, helperText, className = '', ...props }, ref) => {
        return (
            <div className="w-full">
                {label && (
                    <label className="block text-sm font-semibold text-white mb-2">
                        {label}
                    </label>
                )}

                <div className="relative">
                    {icon && (
                        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-christmas-gold">
                            {icon}
                        </div>
                    )}

                    <input
                        ref={ref}
                        className={`
              w-full px-4 py-3 rounded-premium
              bg-neutral-900/50 border-2 border-neutral-700
              text-white placeholder-neutral-500
              transition-smooth
              focus:border-christmas-gold focus:outline-none focus:shadow-gold
              focus:bg-neutral-900
              disabled:opacity-50 disabled:cursor-not-allowed
              ${icon ? 'pl-12' : ''}
              ${error ? 'border-red-500 focus:border-red-500 focus:shadow-red' : ''}
              ${success ? 'border-emerald-500 focus:border-emerald-500' : ''}
              ${className}
            `}
                        {...props}
                    />

                    {success && (
                        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-emerald-500">
                            <CheckCircle className="w-5 h-5" />
                        </div>
                    )}

                    {error && (
                        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-red-500">
                            <AlertCircle className="w-5 h-5" />
                        </div>
                    )}
                </div>

                {error && (
                    <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {error}
                    </p>
                )}

                {helperText && !error && (
                    <p className="text-neutral-500 text-sm mt-2">
                        {helperText}
                    </p>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';

// ============================================================================
// MODAL COMPONENT - Modales Premium con Animación
// ============================================================================

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    closeButton?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    title,
    children,
    size = 'md',
    closeButton = true,
}) => {
    if (!isOpen) return null;

    const sizeStyles = {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl',
    };

    return (
        <>
            <div
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 animate-fade-in"
                onClick={onClose}
            />

            <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
                <div
                    className={`
            ${sizeStyles[size]} w-full
            bg-neutral-900 border border-neutral-800
            rounded-premium-lg shadow-premium-lg
            animate-scale-in
          `}
                    onClick={(e) => e.stopPropagation()}
                >
                    {(title || closeButton) && (
                        <div className="flex items-center justify-between p-6 border-b border-neutral-800">
                            {title && (
                                <h2 className="text-2xl font-serif text-white">
                                    {title}
                                </h2>
                            )}
                            {closeButton && (
                                <button
                                    onClick={onClose}
                                    className="p-2 hover:bg-neutral-800 rounded-lg transition-smooth"
                                    aria-label="Cerrar modal"
                                >
                                    <X className="w-6 h-6 text-neutral-400" />
                                </button>
                            )}
                        </div>
                    )}

                    <div className="p-6">
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
};

// ============================================================================
// BADGE COMPONENT - Insignias Premium
// ============================================================================

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    variant?: 'primary' | 'success' | 'warning' | 'danger' | 'info';
    size?: 'sm' | 'md' | 'lg';
}

export const Badge: React.FC<BadgeProps> = ({
    variant = 'primary',
    size = 'md',
    className = '',
    children,
    ...props
}) => {
    const sizeStyles = {
        sm: 'px-2 py-1 text-xs',
        md: 'px-3 py-1.5 text-sm',
        lg: 'px-4 py-2 text-base',
    };

    const variantStyles = {
        primary: 'bg-christmas-red/20 text-christmas-red border border-christmas-red/30',
        success: 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30',
        warning: 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30',
        danger: 'bg-red-500/20 text-red-300 border border-red-500/30',
        info: 'bg-christmas-blue/20 text-christmas-blue-light border border-christmas-blue/30',
    };

    return (
        <span
            className={`
        inline-flex items-center rounded-full font-semibold
        transition-smooth
        ${sizeStyles[size]}
        ${variantStyles[variant]}
        ${className}
      `}
            {...props}
        >
            {children}
        </span>
    );
};

// ============================================================================
// SECTION COMPONENT - Secciones Premium con Gradientes
// ============================================================================

interface SectionProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: 'red' | 'gold' | 'green' | 'blue' | 'festive' | 'dark';
    fullHeight?: boolean;
}

export const Section: React.FC<SectionProps> = ({
    variant = 'dark',
    fullHeight = false,
    className = '',
    children,
    ...props
}) => {
    const variantStyles = {
        red: 'bg-gradient-to-br from-christmas-red/10 via-neutral-900 to-neutral-900',
        gold: 'bg-gradient-to-br from-christmas-gold/5 via-neutral-900 to-neutral-900',
        green: 'bg-gradient-to-br from-christmas-green/10 via-neutral-900 to-neutral-900',
        blue: 'bg-gradient-to-br from-christmas-blue/10 via-neutral-900 to-neutral-900',
        festive: 'bg-gradient-to-br from-christmas-red/5 via-christmas-gold/5 to-christmas-green/5',
        dark: 'bg-neutral-900',
    };

    return (
        <section
            className={`
        py-20 px-4 sm:px-6 lg:px-8
        ${fullHeight ? 'min-h-screen' : ''}
        ${variantStyles[variant]}
        ${className}
      `}
            {...props}
        >
            {children}
        </section>
    );
};

// ============================================================================
// LOADING SPINNER - Spinner Premium
// ============================================================================

interface SpinnerProps {
    size?: 'sm' | 'md' | 'lg';
    color?: 'gold' | 'red' | 'white';
}

export const Spinner: React.FC<SpinnerProps> = ({
    size = 'md',
    color = 'gold',
}) => {
    const sizeStyles = {
        sm: 'w-6 h-6',
        md: 'w-10 h-10',
        lg: 'w-16 h-16',
    };

    const colorStyles = {
        gold: 'text-christmas-gold',
        red: 'text-christmas-red',
        white: 'text-white',
    };

    return (
        <div className="flex items-center justify-center">
            <Loader2 className={`${sizeStyles[size]} ${colorStyles[color]} animate-spin`} />
        </div>
    );
};

// ============================================================================
// TOAST NOTIFICATION - Notificaciones Premium
// ============================================================================

interface ToastProps {
    type?: 'success' | 'error' | 'warning' | 'info';
    message: string;
    onClose?: () => void;
    autoClose?: number;
}

export const Toast: React.FC<ToastProps> = ({
    type = 'info',
    message,
    onClose,
    autoClose = 3000,
}) => {
    React.useEffect(() => {
        if (autoClose && onClose) {
            const timer = setTimeout(onClose, autoClose);
            return () => clearTimeout(timer);
        }
    }, [autoClose, onClose]);

    const typeStyles = {
        success: 'bg-emerald-500/20 border-emerald-500 text-emerald-300',
        error: 'bg-red-500/20 border-red-500 text-red-300',
        warning: 'bg-yellow-500/20 border-yellow-500 text-yellow-300',
        info: 'bg-christmas-blue/20 border-christmas-blue text-christmas-blue-light',
    };

    return (
        <div
            className={`
        fixed bottom-4 right-4 max-w-sm
        px-6 py-4 rounded-premium
        border-2 ${typeStyles[type]}
        shadow-premium-lg
        animate-slide-in-up
        flex items-center justify-between gap-4
        z-50
      `}
        >
            <span className="font-medium">{message}</span>
            {onClose && (
                <button
                    onClick={onClose}
                    className="p-1 hover:bg-white/10 rounded transition-smooth"
                >
                    <X className="w-5 h-5" />
                </button>
            )}
        </div>
    );
};

// ============================================================================
// DIVIDER - Divisor Premium
// ============================================================================

interface DividerProps {
    variant?: 'gold' | 'festive' | 'subtle';
    className?: string;
}

export const Divider: React.FC<DividerProps> = ({
    variant = 'gold',
    className = '',
}) => {
    const variantStyles = {
        gold: 'divider-gold',
        festive: 'divider-festive',
        subtle: 'h-px bg-neutral-800',
    };

    return <div className={`${variantStyles[variant]} ${className}`} />;
};

// ============================================================================
// GRADIENT TEXT - Texto con Gradiente
// ============================================================================

interface GradientTextProps extends React.HTMLAttributes<HTMLSpanElement> {
    variant?: 'gold' | 'festive' | 'red' | 'green' | 'blue';
}

export const GradientText: React.FC<GradientTextProps> = ({
    variant = 'gold',
    className = '',
    children,
    ...props
}) => {
    const variantStyles = {
        gold: 'text-gradient-gold',
        festive: 'text-gradient-festive',
        red: 'bg-gradient-red -webkit-background-clip-text -webkit-text-fill-color-transparent',
        green: 'bg-gradient-green -webkit-background-clip-text -webkit-text-fill-color-transparent',
        blue: 'bg-gradient-blue -webkit-background-clip-text -webkit-text-fill-color-transparent',
    };

    return (
        <span className={`${variantStyles[variant]} ${className}`} {...props}>
            {children}
        </span>
    );
};

const RedesignUI = {
    Button,
    Card,
    Input,
    Modal,
    Badge,
    Section,
    Spinner,
    Toast,
    Divider,
    GradientText,
};

export default RedesignUI;

