// Transport Geography Educational Game - Main JavaScript

class TransportGeographyGame {
  constructor() {
    this.currentScenario = null;
    this.selectedTransportMode = null;
    this.map = null;
    this.routes = [];
    this.gameData = {
      scenarios: [],
      transportModes: []
    };
    
    this.init();
  }

  async init() {
    await this.loadGameData();
    this.setupEventListeners();
    this.initializeInterface();
  }

  async loadGameData() {
    try {
      // Load transport modes
      const modesResponse = await axios.get('/api/transport-modes');
      this.gameData.transportModes = modesResponse.data;

      // Load scenarios
      const scenariosResponse = await axios.get('/api/scenarios');
      this.gameData.scenarios = scenariosResponse.data;

    } catch (error) {
      console.error('Error loading game data:', error);
      this.showNotification('Error loading game data. Please refresh the page.', 'error');
    }
  }

  setupEventListeners() {
    // Start game button
    const startBtn = document.getElementById('startGame');
    if (startBtn) {
      startBtn.addEventListener('click', () => this.startGame());
    }

    // Simulate button
    const simulateBtn = document.getElementById('simulateBtn');
    if (simulateBtn) {
      simulateBtn.addEventListener('click', () => this.runSimulation());
    }
  }

  startGame() {
    const gameInterface = document.getElementById('gameInterface');
    if (gameInterface) {
      gameInterface.classList.remove('hidden');
      gameInterface.scrollIntoView({ behavior: 'smooth' });
      
      this.renderScenarios();
      this.renderTransportModes();
      this.initializeMap();
    }
  }

  renderScenarios() {
    const container = document.getElementById('scenariosList');
    if (!container) return;

    container.innerHTML = this.gameData.scenarios.map(scenario => `
      <div class="scenario-card bg-white border border-gray-200 rounded-lg p-3 shadow-sm hover:shadow-md" 
           data-scenario-id="${scenario.id}">
        <div class="flex justify-between items-start mb-2">
          <h4 class="font-semibold text-gray-800 text-sm">${scenario.title}</h4>
          <span class="text-xs px-2 py-1 rounded-full ${this.getDifficultyColor(scenario.difficulty)} text-white">
            ${scenario.difficulty}
          </span>
        </div>
        <p class="text-gray-600 text-xs mb-2">${scenario.description}</p>
        <div class="text-xs text-gray-500">
          <strong>Objectives:</strong>
          <ul class="list-disc list-inside mt-1">
            ${scenario.objectives.map(obj => `<li>${obj}</li>`).join('')}
          </ul>
        </div>
      </div>
    `).join('');

    // Add click listeners to scenarios
    container.querySelectorAll('.scenario-card').forEach(card => {
      card.addEventListener('click', (e) => {
        // Remove previous selection
        container.querySelectorAll('.scenario-card').forEach(c => 
          c.classList.remove('ring-2', 'ring-blue-500', 'bg-blue-50')
        );
        
        // Add selection to clicked card
        card.classList.add('ring-2', 'ring-blue-500', 'bg-blue-50');
        
        const scenarioId = card.dataset.scenarioId;
        this.selectScenario(scenarioId);
      });
    });
  }

  renderTransportModes() {
    const container = document.getElementById('transportModes');
    if (!container) return;

    container.innerHTML = this.gameData.transportModes.map(mode => `
      <div class="transport-mode-card bg-white border border-gray-200 rounded-lg p-3 shadow-sm" 
           data-mode-id="${mode.id}">
        <div class="flex items-center mb-2">
          <div class="w-4 h-4 rounded-full mr-2" style="background-color: ${mode.color}"></div>
          <h5 class="font-medium text-gray-800 text-sm">${mode.name}</h5>
        </div>
        <div class="grid grid-cols-3 gap-1 text-xs text-gray-600">
          <div><strong>Speed:</strong> ${mode.speed}</div>
          <div><strong>Capacity:</strong> ${mode.capacity}</div>
          <div><strong>Cost:</strong> ${mode.cost}</div>
        </div>
      </div>
    `).join('');

    // Add click listeners to transport modes
    container.querySelectorAll('.transport-mode-card').forEach(card => {
      card.addEventListener('click', (e) => {
        // Remove previous selection
        container.querySelectorAll('.transport-mode-card').forEach(c => 
          c.classList.remove('ring-2', 'ring-green-500', 'bg-green-50')
        );
        
        // Add selection to clicked card
        card.classList.add('ring-2', 'ring-green-500', 'bg-green-50');
        
        const modeId = card.dataset.modeId;
        this.selectTransportMode(modeId);
      });
    });
  }

  getDifficultyColor(difficulty) {
    switch (difficulty.toLowerCase()) {
      case 'beginner': return 'bg-green-500';
      case 'intermediate': return 'bg-yellow-500';
      case 'advanced': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  }

  selectScenario(scenarioId) {
    this.currentScenario = this.gameData.scenarios.find(s => s.id === scenarioId);
    this.updateMap();
    this.showNotification(`Selected scenario: ${this.currentScenario.title}`, 'success');
  }

  selectTransportMode(modeId) {
    this.selectedTransportMode = this.gameData.transportModes.find(m => m.id === modeId);
    this.showNotification(`Selected transport mode: ${this.selectedTransportMode.name}`, 'success');
  }

  initializeMap() {
    const mapContainer = document.getElementById('mapContainer');
    if (!mapContainer || this.map) return;

    // Clear the placeholder content
    mapContainer.innerHTML = '<div id="leafletMap" style="height: 100%; width: 100%;"></div>';
    
    // Initialize Leaflet map
    try {
      this.map = L.map('leafletMap').setView([20, 0], 2);
      
      // Add OpenStreetMap tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(this.map);

      // Add some example markers for major transport hubs
      this.addTransportHubs();
      
    } catch (error) {
      console.error('Error initializing map:', error);
      mapContainer.innerHTML = `
        <div class="flex items-center justify-center h-full text-gray-500">
          <div class="text-center">
            <i class="fas fa-exclamation-triangle text-4xl mb-2"></i>
            <p>Map initialization failed</p>
            <small>Interactive features limited</small>
          </div>
        </div>
      `;
    }
  }

  addTransportHubs() {
    if (!this.map) return;

    const majorHubs = [
      { name: 'Port of Shanghai', lat: 31.2304, lng: 121.4737, type: 'maritime' },
      { name: 'Heathrow Airport', lat: 51.4700, lng: -0.4543, type: 'air' },
      { name: 'Trans-Siberian Railway', lat: 55.7558, lng: 37.6176, type: 'rail' },
      { name: 'Suez Canal', lat: 30.5234, lng: 32.6056, type: 'maritime' },
      { name: 'Panama Canal', lat: 9.0820, lng: -79.6806, type: 'maritime' },
      { name: 'Dubai International Hub', lat: 25.2532, lng: 55.3657, type: 'air' }
    ];

    majorHubs.forEach(hub => {
      const mode = this.gameData.transportModes.find(m => m.id === hub.type);
      const color = mode ? mode.color : '#666666';
      
      L.circleMarker([hub.lat, hub.lng], {
        radius: 8,
        fillColor: color,
        color: '#ffffff',
        weight: 2,
        opacity: 1,
        fillOpacity: 0.8
      }).addTo(this.map)
        .bindPopup(`<strong>${hub.name}</strong><br>Type: ${hub.type}`)
        .on('click', () => this.onHubClick(hub));
    });
  }

  onHubClick(hub) {
    this.showNotification(`Clicked on ${hub.name}`, 'info');
    // Here you could add route planning functionality
  }

  updateMap() {
    if (!this.map || !this.currentScenario) return;

    // Update map based on selected scenario
    switch (this.currentScenario.id) {
      case 'global-trade':
        this.map.setView([20, 0], 2);
        break;
      case 'urban-commuting':
        this.map.setView([40.7128, -74.0060], 10); // NYC as example
        break;
      case 'supply-chain':
        this.map.setView([39.9042, 116.4074], 6); // Beijing region
        break;
      case 'regional-connectivity':
        this.map.setView([52.5200, 13.4050], 6); // Berlin region
        break;
    }
  }

  async runSimulation() {
    if (!this.currentScenario || !this.selectedTransportMode) {
      this.showNotification('Please select both a scenario and transport mode', 'warning');
      return;
    }

    const simulateBtn = document.getElementById('simulateBtn');
    const originalText = simulateBtn.innerHTML;
    
    // Show loading state
    simulateBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Running Simulation...';
    simulateBtn.disabled = true;

    try {
      const response = await axios.post('/api/simulate', {
        scenario: this.currentScenario.id,
        routes: this.routes,
        mode: this.selectedTransportMode.id
      });

      this.displayResults(response.data);
      
    } catch (error) {
      console.error('Simulation error:', error);
      this.showNotification('Simulation failed. Please try again.', 'error');
    } finally {
      // Restore button state
      simulateBtn.innerHTML = originalText;
      simulateBtn.disabled = false;
    }
  }

  displayResults(results) {
    const resultsDiv = document.getElementById('results');
    const resultsContent = document.getElementById('resultsContent');
    
    if (!resultsDiv || !resultsContent) return;

    resultsContent.innerHTML = `
      <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
        <div class="text-2xl font-bold text-blue-800">$${results.totalCost.toLocaleString()}</div>
        <div class="text-sm text-blue-600">Total Cost</div>
      </div>
      
      <div class="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
        <div class="text-2xl font-bold text-green-800">${results.totalTime}h</div>
        <div class="text-sm text-green-600">Total Time</div>
      </div>
      
      <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
        <div class="text-2xl font-bold text-yellow-800">${results.efficiency}%</div>
        <div class="text-sm text-yellow-600">Efficiency</div>
      </div>
      
      <div class="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
        <div class="text-2xl font-bold text-red-800">${results.environmental_impact}</div>
        <div class="text-sm text-red-600">CO₂ Impact</div>
      </div>
    `;

    // Add feedback section
    if (results.feedback && results.feedback.length > 0) {
      resultsContent.innerHTML += `
        <div class="md:col-span-4 mt-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <h4 class="font-semibold text-gray-800 mb-2">Learning Feedback:</h4>
          <ul class="list-disc list-inside space-y-1 text-gray-700 text-sm">
            ${results.feedback.map(item => `<li>${item}</li>`).join('')}
          </ul>
        </div>
      `;
    }

    resultsDiv.classList.remove('hidden');
    resultsDiv.scrollIntoView({ behavior: 'smooth' });
    
    this.showNotification('Simulation completed successfully!', 'success');
  }

  showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transform transition-all duration-300 translate-x-full`;
    
    // Set color based on type
    switch (type) {
      case 'success':
        notification.className += ' bg-green-500 text-white';
        break;
      case 'error':
        notification.className += ' bg-red-500 text-white';
        break;
      case 'warning':
        notification.className += ' bg-yellow-500 text-white';
        break;
      default:
        notification.className += ' bg-blue-500 text-white';
    }
    
    notification.innerHTML = `
      <div class="flex items-center">
        <i class="fas fa-${this.getNotificationIcon(type)} mr-2"></i>
        <span>${message}</span>
      </div>
    `;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
      notification.classList.remove('translate-x-full');
    }, 100);
    
    // Hide and remove notification after 4 seconds
    setTimeout(() => {
      notification.classList.add('translate-x-full');
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 4000);
  }

  getNotificationIcon(type) {
    switch (type) {
      case 'success': return 'check-circle';
      case 'error': return 'exclamation-circle';
      case 'warning': return 'exclamation-triangle';
      default: return 'info-circle';
    }
  }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
  window.transportGame = new TransportGeographyGame();
});

// Educational content and learning modules
class LearningModule {
  static getTransportModeInfo(modeId) {
    const info = {
      maritime: {
        description: "Maritime transport handles about 90% of global trade by volume. It's ideal for bulk cargo and long-distance international trade.",
        advantages: ["Very high capacity", "Low cost per ton", "Energy efficient", "Global reach"],
        disadvantages: ["Slow speed", "Limited to coastal areas", "Weather dependent", "Port infrastructure required"],
        examples: ["Container ships", "Bulk carriers", "Tankers", "Ro-Ro ferries"]
      },
      rail: {
        description: "Rail transport is excellent for medium to long-distance freight and passenger transport, especially for landlocked areas.",
        advantages: ["High capacity", "Energy efficient", "All-weather operation", "Reduced road congestion"],
        disadvantages: ["High infrastructure cost", "Limited flexibility", "Fixed routes", "Intermodal transfers needed"],
        examples: ["Freight trains", "High-speed rail", "Commuter trains", "Metro systems"]
      },
      road: {
        description: "Road transport offers the highest flexibility and door-to-door connectivity, making it essential for last-mile delivery.",
        advantages: ["High flexibility", "Door-to-door service", "Lower infrastructure cost", "Fast for short distances"],
        disadvantages: ["Traffic congestion", "Environmental impact", "Limited capacity", "Driver regulations"],
        examples: ["Trucks", "Buses", "Delivery vans", "Personal vehicles"]
      },
      air: {
        description: "Air transport is fastest for long distances and essential for time-sensitive, high-value cargo and passenger transport.",
        advantages: ["Highest speed", "Global reach", "Time-sensitive cargo", "Passenger preference"],
        disadvantages: ["Highest cost", "Environmental impact", "Capacity limitations", "Weather sensitive"],
        examples: ["Passenger aircraft", "Cargo planes", "Express delivery", "Emergency transport"]
      },
      pipeline: {
        description: "Pipeline transport is most efficient for continuous flow of liquids and gases over long distances.",
        advantages: ["Continuous operation", "Very low cost", "Minimal environmental impact", "High reliability"],
        disadvantages: ["Product limitations", "High capital cost", "Fixed routes", "Security concerns"],
        examples: ["Oil pipelines", "Gas pipelines", "Water mains", "Pneumatic tubes"]
      }
    };
    
    return info[modeId] || null;
  }

  static getScenarioGuidance(scenarioId) {
    const guidance = {
      'global-trade': {
        keyFactors: ["Ocean currents and weather patterns", "Port capacities and capabilities", "International regulations", "Fuel costs and bunker prices"],
        strategy: "Focus on major shipping lanes like Trans-Pacific, Trans-Atlantic, and Asia-Europe routes. Consider seasonal variations and canal constraints.",
        learningObjectives: ["Understand global trade patterns", "Analyze geographic constraints", "Evaluate multimodal connections"]
      },
      'urban-commuting': {
        keyFactors: ["Population density", "Land use patterns", "Peak hour demand", "Environmental considerations"],
        strategy: "Design integrated public transport with good coverage, frequency, and connectivity. Consider park-and-ride facilities.",
        learningObjectives: ["Urban transport planning", "Modal integration", "Accessibility analysis"]
      },
      'supply-chain': {
        keyFactors: ["Supplier locations", "Manufacturing centers", "Distribution networks", "Inventory costs"],
        strategy: "Optimize the balance between transport costs, inventory holding costs, and service levels.",
        learningObjectives: ["Logistics optimization", "Network design", "Cost-benefit analysis"]
      },
      'regional-connectivity': {
        keyFactors: ["Geographic barriers", "Population distribution", "Economic activities", "Infrastructure gaps"],
        strategy: "Improve accessibility while considering topographic constraints and economic feasibility.",
        learningObjectives: ["Regional development", "Accessibility planning", "Infrastructure investment"]
      }
    };
    
    return guidance[scenarioId] || null;
  }
}

// Assessment and scoring system
class AssessmentSystem {
  static calculateScore(results, scenario, transportMode) {
    let score = 0;
    let maxScore = 100;
    
    // Efficiency score (40 points)
    score += Math.min(40, (results.efficiency / 100) * 40);
    
    // Cost effectiveness (30 points)
    const costEfficiency = Math.max(0, 100 - (results.totalCost / 10000));
    score += Math.min(30, (costEfficiency / 100) * 30);
    
    // Time efficiency (20 points)
    const timeEfficiency = Math.max(0, 100 - results.totalTime);
    score += Math.min(20, (timeEfficiency / 100) * 20);
    
    // Environmental consideration (10 points)
    const envScore = Math.max(0, 100 - results.environmental_impact);
    score += Math.min(10, (envScore / 100) * 10);
    
    return Math.round(score);
  }

  static generateDetailedFeedback(score, results, scenario, transportMode) {
    const feedback = [];
    
    if (score >= 85) {
      feedback.push("Excellent! You demonstrate strong understanding of transport geography principles.");
    } else if (score >= 70) {
      feedback.push("Good work! Consider optimizing for better cost-effectiveness.");
    } else if (score >= 55) {
      feedback.push("Fair attempt. Review the trade-offs between different transport modes.");
    } else {
      feedback.push("Needs improvement. Focus on understanding geographical constraints and transport characteristics.");
    }
    
    // Mode-specific feedback
    if (transportMode.id === 'maritime' && results.totalTime > 50) {
      feedback.push("Maritime transport is slow but very cost-effective for bulk cargo over long distances.");
    }
    
    if (transportMode.id === 'air' && results.totalCost > 800000) {
      feedback.push("Air transport is expensive. Consider if the speed advantage justifies the cost.");
    }
    
    if (results.environmental_impact > 25) {
      feedback.push("Consider more environmentally sustainable transport options when possible.");
    }
    
    return feedback;
  }
}