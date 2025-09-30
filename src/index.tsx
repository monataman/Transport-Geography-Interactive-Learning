import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/cloudflare-workers'
import { renderer } from './renderer'

const app = new Hono()

// Enable CORS for API routes
app.use('/api/*', cors())

// Serve static files
app.use('/static/*', serveStatic({ root: './public' }))

// Use JSX renderer for HTML pages
app.use(renderer)

// API Routes for game data and simulation
app.get('/api/transport-modes', (c) => {
  const transportModes = [
    { id: 'maritime', name: 'Maritime Transport', color: '#0066cc', capacity: 'Very High', speed: 'Slow', cost: 'Low' },
    { id: 'rail', name: 'Rail Transport', color: '#cc6600', capacity: 'High', speed: 'Medium', cost: 'Medium' },
    { id: 'road', name: 'Road Transport', color: '#666666', capacity: 'Medium', speed: 'Fast', cost: 'Medium' },
    { id: 'air', name: 'Air Transport', color: '#ff3300', capacity: 'Low', speed: 'Very Fast', cost: 'High' },
    { id: 'pipeline', name: 'Pipeline Transport', color: '#009900', capacity: 'High', speed: 'Continuous', cost: 'Low' }
  ]
  return c.json(transportModes)
})

app.get('/api/scenarios', (c) => {
  const scenarios = [
    {
      id: 'global-trade',
      title: 'Global Trade Simulation',
      description: 'Manage international cargo flows between major ports and economic zones',
      difficulty: 'Advanced',
      objectives: ['Optimize shipping routes', 'Minimize transport costs', 'Consider geographical constraints']
    },
    {
      id: 'urban-commuting',
      title: 'Urban Commuting Network',
      description: 'Design efficient public transport for a growing metropolitan area',
      difficulty: 'Intermediate',
      objectives: ['Connect residential and business districts', 'Reduce travel time', 'Optimize transport capacity']
    },
    {
      id: 'supply-chain',
      title: 'Supply Chain Optimization',
      description: 'Build efficient logistics network for manufacturing and distribution',
      difficulty: 'Advanced',
      objectives: ['Connect suppliers to factories', 'Distribute to retail centers', 'Minimize total logistics cost']
    },
    {
      id: 'regional-connectivity',
      title: 'Regional Connectivity',
      description: 'Connect rural areas with urban centers through multimodal transport',
      difficulty: 'Beginner',
      objectives: ['Improve accessibility', 'Support economic development', 'Consider geographical barriers']
    }
  ]
  return c.json(scenarios)
})

app.post('/api/simulate', async (c) => {
  const { scenario, routes, mode } = await c.req.json()
  
  // Enhanced simulation logic with educational context
  const baseResults = calculateTransportMetrics(scenario, mode)
  const assessment = calculateAssessmentScore(baseResults, scenario, mode)
  
  const results = {
    ...baseResults,
    score: assessment.score,
    grade: assessment.grade,
    feedback: assessment.feedback,
    educational_insights: getEducationalInsights(scenario, mode),
    next_steps: getNextLearningSteps(assessment.score, scenario)
  }
  
  return c.json(results)
})

// Educational assessment endpoint
app.post('/api/assessment', async (c) => {
  const { answers, scenario, mode } = await c.req.json()
  
  const assessment = {
    score: calculateQuizScore(answers),
    total_questions: answers.length,
    correct_answers: answers.filter((a: any) => a.correct).length,
    learning_areas: identifyLearningAreas(answers),
    recommendations: generateRecommendations(answers, scenario)
  }
  
  return c.json(assessment)
})

// Learning content endpoint
app.get('/api/learning/:topic', (c) => {
  const topic = c.req.param('topic')
  const content = getLearningContent(topic)
  return c.json(content)
})

// User Manual route (redirect to static HTML)
app.get('/manual', (c) => {
  return c.redirect('/static/user-manual.html')
})

// Main game interface
app.get('/', (c) => {
  return c.render(
    <div class="min-h-screen bg-gradient-to-br from-blue-900 to-teal-700">
      <div class="container mx-auto px-4 py-8">
        <header class="text-center mb-8">
          <h1 class="text-4xl font-bold text-white mb-4">
            Transport Geography Interactive Learning Platform
          </h1>
          <p class="text-xl text-blue-100 max-w-3xl mx-auto">
            Master the fundamentals of mobility in economic and social activities through interactive simulations.
            Explore passenger and freight mobility across global, regional, and local transportation systems.
          </p>
        </header>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div class="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
            <div class="text-blue-300 mb-4">
              <i class="fas fa-globe-americas text-3xl"></i>
            </div>
            <h3 class="text-xl font-semibold text-white mb-2">Global Networks</h3>
            <p class="text-blue-100">Explore international trade routes and maritime corridors</p>
          </div>

          <div class="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
            <div class="text-green-300 mb-4">
              <i class="fas fa-city text-3xl"></i>
            </div>
            <h3 class="text-xl font-semibold text-white mb-2">Urban Systems</h3>
            <p class="text-blue-100">Design efficient metropolitan transport networks</p>
          </div>

          <div class="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
            <div class="text-yellow-300 mb-4">
              <i class="fas fa-truck text-3xl"></i>
            </div>
            <h3 class="text-xl font-semibold text-white mb-2">Supply Chains</h3>
            <p class="text-blue-100">Optimize logistics and freight distribution networks</p>
          </div>
        </div>

        <div class="text-center">
          <button id="startGame" class="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
            <i class="fas fa-play mr-2"></i>
            Start Learning Journey
          </button>
        </div>

        <div id="gameInterface" class="hidden mt-8">
          <div class="bg-white rounded-lg shadow-2xl overflow-hidden">
            <div class="bg-gradient-to-r from-blue-600 to-purple-600 p-4">
              <h2 class="text-2xl font-bold text-white">Interactive Transport Simulation</h2>
            </div>
            
            <div class="p-6">
              <div class="grid lg:grid-cols-3 gap-6">
                <div class="lg:col-span-2">
                  <div id="mapContainer" class="bg-gray-100 rounded-lg h-96 relative border-2 border-dashed border-gray-300 flex items-center justify-center">
                    <div class="text-center text-gray-500">
                      <i class="fas fa-map text-4xl mb-2"></i>
                      <p>Interactive Map Area</p>
                      <small>Click scenarios to load different geographic contexts</small>
                    </div>
                  </div>
                </div>

                <div class="space-y-6">
                  <div>
                    <h3 class="text-lg font-semibold mb-3 text-gray-800">Learning Scenarios</h3>
                    <div id="scenariosList" class="space-y-2">
                      {/* Scenarios will be loaded here */}
                    </div>
                  </div>

                  <div>
                    <h3 class="text-lg font-semibold mb-3 text-gray-800">Transport Modes</h3>
                    <div id="transportModes" class="space-y-2">
                      {/* Transport modes will be loaded here */}
                    </div>
                  </div>

                  <div>
                    <button id="simulateBtn" class="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors">
                      <i class="fas fa-cogs mr-2"></i>
                      Run Simulation
                    </button>
                  </div>
                </div>
              </div>

              <div id="results" class="hidden mt-6 p-4 bg-gray-50 rounded-lg">
                <h3 class="text-lg font-semibold mb-3">Simulation Results</h3>
                <div id="resultsContent" class="grid md:grid-cols-4 gap-4">
                  {/* Results will be displayed here */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})

// Game scenario pages
app.get('/scenario/:id', (c) => {
  const scenarioId = c.req.param('id')
  return c.render(
    <div class="min-h-screen bg-gray-50 p-8">
      <div class="max-w-6xl mx-auto">
        <div class="mb-6">
          <a href="/" class="text-blue-600 hover:text-blue-800 font-medium">
            <i class="fas fa-arrow-left mr-2"></i>Back to Main
          </a>
        </div>
        
        <div class="bg-white rounded-lg shadow-lg overflow-hidden">
          <div class="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
            <h1 class="text-3xl font-bold text-white">Scenario: {scenarioId}</h1>
          </div>
          
          <div class="p-6">
            <div id="scenarioContent" data-scenario={scenarioId}>
              {/* Scenario-specific content will be loaded here */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})

function calculateTransportMetrics(scenario: string, mode: string) {
  // Base metrics influenced by transport mode characteristics
  const modeMultipliers = {
    maritime: { cost: 0.3, time: 3.0, efficiency: 0.9, environment: 0.4 },
    rail: { cost: 0.6, time: 1.5, efficiency: 0.8, environment: 0.5 },
    road: { cost: 0.8, time: 1.0, efficiency: 0.6, environment: 0.8 },
    air: { cost: 2.5, time: 0.3, efficiency: 0.7, environment: 1.5 },
    pipeline: { cost: 0.4, time: 2.0, efficiency: 0.95, environment: 0.3 }
  }
  
  const multiplier = modeMultipliers[mode as keyof typeof modeMultipliers] || modeMultipliers.road
  
  // Scenario-specific base values
  const scenarioFactors = {
    'global-trade': { baseCost: 800000, baseTime: 168, complexity: 1.5 },
    'urban-commuting': { baseCost: 150000, baseTime: 48, complexity: 1.0 },
    'supply-chain': { baseCost: 400000, baseTime: 72, complexity: 1.3 },
    'regional-connectivity': { baseCost: 250000, baseTime: 96, complexity: 1.2 }
  }
  
  const factor = scenarioFactors[scenario as keyof typeof scenarioFactors] || scenarioFactors['urban-commuting']
  
  return {
    totalCost: Math.floor(factor.baseCost * multiplier.cost * (0.8 + Math.random() * 0.4)),
    totalTime: Math.floor(factor.baseTime * multiplier.time * (0.8 + Math.random() * 0.4)),
    efficiency: Math.floor(85 * multiplier.efficiency * (0.9 + Math.random() * 0.2)),
    environmental_impact: Math.floor(50 * multiplier.environment * (0.8 + Math.random() * 0.4))
  }
}

function calculateAssessmentScore(results: any, scenario: string, mode: string) {
  let score = 0
  
  // Cost efficiency (25 points)
  const costScore = Math.max(0, 25 - (results.totalCost / 50000))
  score += Math.min(25, costScore)
  
  // Time efficiency (25 points)  
  const timeScore = Math.max(0, 25 - (results.totalTime / 10))
  score += Math.min(25, timeScore)
  
  // Overall efficiency (25 points)
  score += (results.efficiency / 100) * 25
  
  // Environmental consideration (25 points)
  const envScore = Math.max(0, 25 - (results.environmental_impact / 4))
  score += Math.min(25, envScore)
  
  const finalScore = Math.round(score)
  
  return {
    score: finalScore,
    grade: getGrade(finalScore),
    feedback: generateDetailedFeedback(finalScore, results, scenario, mode)
  }
}

function getGrade(score: number): string {
  if (score >= 90) return 'A+'
  if (score >= 85) return 'A'
  if (score >= 80) return 'A-'
  if (score >= 75) return 'B+'
  if (score >= 70) return 'B'
  if (score >= 65) return 'B-'
  if (score >= 60) return 'C+'
  if (score >= 55) return 'C'
  if (score >= 50) return 'C-'
  return 'D'
}

function generateDetailedFeedback(score: number, results: any, scenario: string, mode: string): string[] {
  const feedback = []
  
  if (score >= 85) {
    feedback.push("🎉 Excellent performance! You demonstrate strong understanding of transport geography principles.")
  } else if (score >= 70) {
    feedback.push("👍 Good work! Your solution shows solid grasp of transport planning concepts.")
  } else if (score >= 55) {
    feedback.push("⚠️ Fair attempt. Review the relationship between transport modes and geographical factors.")
  } else {
    feedback.push("📚 This scenario needs more attention. Focus on understanding transport mode characteristics.")
  }
  
  // Cost analysis
  if (results.totalCost > 600000) {
    feedback.push("💰 Consider more cost-effective transport modes or route optimization.")
  }
  
  // Time analysis
  if (results.totalTime > 120) {
    feedback.push("⏱️ Look for faster transport options, especially for time-sensitive scenarios.")
  }
  
  // Efficiency analysis
  if (results.efficiency < 70) {
    feedback.push("⚡ Transport efficiency can be improved through better modal choice and network design.")
  }
  
  // Environmental analysis
  if (results.environmental_impact > 40) {
    feedback.push("🌱 Consider more environmentally sustainable transport options.")
  }
  
  // Mode-specific feedback
  const modeFeedback = getModeSpecificFeedback(mode, scenario)
  if (modeFeedback) feedback.push(modeFeedback)
  
  return feedback
}

function getModeSpecificFeedback(mode: string, scenario: string): string {
  const insights = {
    maritime: {
      'global-trade': "🚢 Excellent choice for international bulk trade! Maritime transport dominates global freight.",
      'urban-commuting': "⚠️ Maritime transport has limited urban application. Consider ferry services for waterfront cities.",
      'supply-chain': "🚢 Good for bulk raw materials, but consider intermodal connections for final delivery.",
      'regional-connectivity': "🚢 Limited applicability unless connecting coastal regions via ferry services."
    },
    rail: {
      'global-trade': "🚂 Rail works well for continental trade, especially for bulk commodities across landmasses.",
      'urban-commuting': "🚂 Excellent choice! Rail systems are ideal for high-capacity urban transport.",
      'supply-chain': "🚂 Great for medium to long-distance freight, especially for heavy goods.",
      'regional-connectivity': "🚂 Perfect for connecting regions, though requires significant infrastructure investment."
    },
    road: {
      'global-trade': "🚛 Road transport is limited for global trade but essential for last-mile delivery.",
      'urban-commuting': "🚛 Consider traffic congestion and environmental impact in urban areas.",
      'supply-chain': "🚛 Ideal for flexibility and door-to-door delivery in supply chains.",
      'regional-connectivity': "🚛 Excellent flexibility but consider infrastructure and maintenance costs."
    },
    air: {
      'global-trade': "✈️ Perfect for high-value, time-sensitive goods in global trade networks.",
      'urban-commuting': "✈️ Not applicable for urban commuting. Consider for inter-city connections.",
      'supply-chain': "✈️ Excellent for urgent, high-value items but very expensive for bulk goods.",
      'regional-connectivity': "✈️ Great for connecting remote regions, but consider airport infrastructure needs."
    }
  }
  
  return insights[mode as keyof typeof insights]?.[scenario as keyof any] || ""
}

function getEducationalInsights(scenario: string, mode: string) {
  const insights = {
    geographical_factors: getGeographicalFactors(scenario),
    mode_characteristics: getModeCharacteristics(mode),
    real_world_examples: getRealWorldExamples(scenario, mode),
    planning_considerations: getPlanningConsiderations(scenario)
  }
  
  return insights
}

function getGeographicalFactors(scenario: string): string[] {
  const factors = {
    'global-trade': [
      "Ocean currents affect shipping routes and fuel consumption",
      "Strait passages like Suez and Panama create bottlenecks",
      "Seasonal weather patterns influence route planning",
      "Port depth and infrastructure limit vessel sizes"
    ],
    'urban-commuting': [
      "Population density determines transport demand patterns", 
      "Topography affects infrastructure costs and route feasibility",
      "Land use patterns influence origin-destination flows",
      "Water bodies may require bridges or tunnels"
    ],
    'supply-chain': [
      "Resource distribution affects supplier locations",
      "Market proximity influences distribution strategies", 
      "Border crossings add complexity to international supply chains",
      "Industrial clustering creates transport economies of scale"
    ],
    'regional-connectivity': [
      "Mountain ranges create natural barriers requiring tunnels or detours",
      "River systems may facilitate or hinder transport development",
      "Climate affects year-round accessibility of transport links",
      "Population distribution determines service priorities"
    ]
  }
  
  return factors[scenario as keyof typeof factors] || []
}

function getModeCharacteristics(mode: string): any {
  const characteristics = {
    maritime: {
      capacity: "Very High (up to 20,000+ TEU containers)",
      speed: "Slow (15-25 knots average)",
      cost: "Lowest per ton-km for bulk goods",
      infrastructure: "Ports, terminals, inland connections",
      limitations: "Weather dependent, port access only"
    },
    rail: {
      capacity: "High (100+ car freight trains)",
      speed: "Medium (80-120 km/h freight, 200+ km/h passenger)",
      cost: "Low to medium per ton-km",
      infrastructure: "Tracks, stations, signaling systems",
      limitations: "Fixed routes, high infrastructure costs"
    },
    road: {
      capacity: "Medium (40 tons max truck weight)",
      speed: "Fast (flexible, 60-120 km/h)",
      cost: "Medium per ton-km",
      infrastructure: "Roads, bridges, maintenance facilities",
      limitations: "Traffic congestion, driver regulations"
    },
    air: {
      capacity: "Low (cargo planes ~150 tons max)",
      speed: "Very Fast (800+ km/h)",
      cost: "Highest per ton-km",
      infrastructure: "Airports, air traffic control",
      limitations: "Weather sensitive, high fuel costs"
    },
    pipeline: {
      capacity: "Very High (continuous flow)",
      speed: "Continuous (5-15 km/h flow)",
      cost: "Lowest for liquids/gases",
      infrastructure: "Pipes, pumping stations, storage",
      limitations: "Product specific, security concerns"
    }
  }
  
  return characteristics[mode as keyof typeof characteristics] || {}
}

function getRealWorldExamples(scenario: string, mode: string): string[] {
  // This would return relevant real-world case studies
  return [
    `Case Study: ${scenario} using ${mode} transport`,
    "Key success factors and lessons learned",
    "Challenges faced and solutions implemented"
  ]
}

function getPlanningConsiderations(scenario: string): string[] {
  return [
    "Demand forecasting and capacity planning",
    "Environmental impact assessment", 
    "Economic feasibility analysis",
    "Stakeholder engagement and policy alignment"
  ]
}

function getNextLearningSteps(score: number, scenario: string): string[] {
  if (score >= 85) {
    return [
      "Explore advanced optimization techniques",
      "Study multimodal transport integration",
      "Research sustainable transport innovations"
    ]
  } else if (score >= 70) {
    return [
      "Practice route optimization exercises",
      "Study transport economics principles",
      "Analyze real-world case studies"
    ]
  } else {
    return [
      "Review basic transport geography concepts",
      "Study transport mode characteristics",
      "Practice with simpler scenarios first"
    ]
  }
}

function calculateQuizScore(answers: any[]): number {
  return Math.round((answers.filter(a => a.correct).length / answers.length) * 100)
}

function identifyLearningAreas(answers: any[]): string[] {
  return ["Transport Economics", "Route Planning", "Environmental Impact"]
}

function generateRecommendations(answers: any[], scenario: string): string[] {
  return ["Focus on cost-benefit analysis", "Study modal choice factors"]
}

function getLearningContent(topic: string): any {
  const content = {
    'transport-modes': {
      title: "Transport Modes Overview",
      concepts: ["Modal characteristics", "Capacity and speed trade-offs", "Cost considerations"],
      examples: ["Container shipping", "High-speed rail", "Trucking networks"]
    },
    'route-planning': {
      title: "Route Planning Fundamentals", 
      concepts: ["Network analysis", "Shortest path algorithms", "Capacity constraints"],
      examples: ["Airline route networks", "Maritime shipping lanes", "Highway systems"]
    }
  }
  
  return content[topic as keyof typeof content] || { title: "Topic not found" }
}

export default app
