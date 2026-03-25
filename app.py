"""
Beautiful Flask Application for CI/CD Testing
Demonstrates a modern web app ready for cloud deployment and testing
"""
from flask import Flask, render_template, jsonify
from datetime import datetime
import os

app = Flask(__name__, template_folder='templates', static_folder='static')

# Store deployment info
DEPLOYMENT_INFO = {
    'version': '1.0.0',
    'environment': os.getenv('ENV', 'development'),
    'start_time': datetime.now().isoformat()
}

@app.route('/')
def home():
    """Home page - Main dashboard"""
    return render_template('index.html', 
                         info=DEPLOYMENT_INFO,
                         current_time=datetime.now().strftime('%Y-%m-%d %H:%M:%S'))

@app.route('/dashboard')
def dashboard():
    """Dashboard page with system info"""
    return render_template('dashboard.html', 
                         info=DEPLOYMENT_INFO,
                         uptime='Running smoothly')

@app.route('/health', methods=['GET'])
def health():
    """Health check endpoint for Kubernetes"""
    return jsonify({
        'status': 'healthy',
        'version': DEPLOYMENT_INFO['version'],
        'environment': DEPLOYMENT_INFO['environment'],
        'timestamp': datetime.now().isoformat()
    }), 200

@app.route('/api/status', methods=['GET'])
def api_status():
    """API endpoint for status information"""
    return jsonify({
        'application': 'CI/CD Demo App',
        'status': 'running',
        'version': DEPLOYMENT_INFO['version'],
        'environment': DEPLOYMENT_INFO['environment'],
        'started_at': DEPLOYMENT_INFO['start_time'],
        'current_time': datetime.now().isoformat()
    }), 200

@app.errorhandler(404)
def not_found_error(error):
    """Handle 404 errors"""
    return render_template('404.html'), 404

@app.errorhandler(500)
def internal_error(error):
    """Handle 500 errors"""
    return render_template('500.html'), 500

if __name__ == '__main__':
    # Run the Flask app
    app.run(host='0.0.0.0', port=8080, debug=False)