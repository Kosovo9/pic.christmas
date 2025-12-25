import { Grid } from 'react-window'
import { useRef, useEffect, useState, ReactElement } from 'react'

const CARD = 180 // px
const GAP = 16

export default function Gallery({ styles }: { styles: string[] }) {
    const ref = useRef<HTMLDivElement>(null)
    const [width, setWidth] = useState(1200)

    useEffect(() => {
        if (ref.current) {
            setWidth(ref.current.clientWidth)
        }
        const handleResize = () => {
            if (ref.current) setWidth(ref.current.clientWidth)
        }
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const cols = Math.floor(width / (CARD + GAP)) || 1

    const Cell = ({ columnIndex, rowIndex, style }: any): ReactElement => {
        const idx = rowIndex * cols + columnIndex
        if (idx >= styles.length) return <div style={style} />
        return (
            <div style={{ ...style, left: (style.left as number) + GAP, top: (style.top as number) + GAP, width: (style.width as number) - GAP, height: (style.height as number) - GAP }}>
                <img src={styles[idx]} className="rounded-2xl object-cover w-full h-full" loading="lazy" alt="Gallery item" />
            </div>
        )
    }

    return (
        <div ref={ref} className="w-full h-[600px]">
            <Grid
                columnCount={cols}
                columnWidth={CARD + GAP}
                rowCount={Math.ceil(styles.length / cols)}
                rowHeight={CARD + GAP}
                cellComponent={Cell}
                cellProps={{}}
                style={{ height: 600, width }}
            />
        </div>
    )
}
