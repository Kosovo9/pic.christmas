import os
import logging
from flask import Flask, request, jsonify
from functools import wraps
import time
import random

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

app = Flask(__name__)

# Configuration
API_KEY = os.getenv("QUANTUM_API_KEY", "default-quantum-key-change-me")
PORT = int(os.getenv("PORT", 5000))

def require_api_key(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if request.headers.get('X-API-KEY') != API_KEY:
            return jsonify({"error": "Unauthorized", "message": "Invalid or missing API key"}), 401
        return f(*args, **kwargs)
    return decorated_function

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({"status": "healthy", "service": "quantum-workflow-api"}), 200

@app.route('/api/v1/process-lead', methods=['POST'])
@require_api_key
def process_lead():
    """
    Receives lead data from n8n, executes 'AI' processing, and returns results.
    """
    start_time = time.time()
    data = request.json
    
    if not data:
        return jsonify({"error": "Bad Request", "message": "No JSON payload provided"}), 400

    lead_id = data.get('lead_id')
    prompt = data.get('prompt')
    
    logger.info(f"Processing lead: {lead_id}")

    try:
        # ------------------------------------------------------------------
        # QUANTUM AI PROCESSING SIMULATION
        # In a real scenario, this connects to OpenAI, Replicate, or local LLMs.
        # ------------------------------------------------------------------
        
        # Simulate processing time
        time.sleep(random.uniform(0.5, 1.5))
        
        # Mock AI Response
        ai_response = {
            "lead_score": random.randint(80, 100),
            "sentiment": "High Intent",
            "generated_outreach": f"Hello! based on your interest in {prompt or 'our services'}, we have a verified solution for you.",
            "next_action": "Schedule Call"
        }
        
        # ------------------------------------------------------------------
        
        execution_time = time.time() - start_time
        
        response = {
            "status": "success",
            "lead_id": lead_id,
            "ai_result": ai_response,
            "meta": {
                "execution_time_seconds": round(execution_time, 3),
                "model": "quantum-optimized-v1"
            }
        }
        
        logger.info(f"Successfully processed lead: {lead_id}")
        return jsonify(response), 200

    except Exception as e:
        logger.error(f"Error processing lead {lead_id}: {str(e)}")
        return jsonify({"error": "Internal Server Error", "message": str(e)}), 500

if __name__ == '__main__':
    logger.info(f"Starting Quantum Workflow API on port {PORT}")
    app.run(host='0.0.0.0', port=PORT, debug=True)
