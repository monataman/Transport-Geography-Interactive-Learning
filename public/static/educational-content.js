// Educational Content Module for Transport Geography

class EducationalContent {
  
  // Quiz questions for different scenarios
  static getQuizQuestions(scenarioId) {
    const questions = {
      'global-trade': [
        {
          id: 1,
          question: "Which transport mode handles approximately 90% of global trade by volume?",
          options: ["Air transport", "Maritime transport", "Rail transport", "Road transport"],
          correct: 1,
          explanation: "Maritime transport dominates global trade, handling about 90% of international cargo by volume due to its high capacity and cost-effectiveness for bulk goods."
        },
        {
          id: 2,
          question: "What is the primary advantage of containerization in global shipping?",
          options: ["Reduced fuel consumption", "Standardized handling and intermodal transfer", "Faster ships", "Lower port taxes"],
          correct: 1,
          explanation: "Containerization revolutionized shipping by standardizing cargo handling, enabling efficient intermodal transfer, and reducing loading/unloading times."
        },
        {
          id: 3,
          question: "Which geographical feature most significantly impacts global shipping routes?",
          options: ["Mountain ranges", "Canals and straits", "Desert regions", "Forest coverage"],
          correct: 1,
          explanation: "Canals (like Suez and Panama) and straits are critical chokepoints that significantly influence global shipping routes and costs."
        }
      ],
      'urban-commuting': [
        {
          id: 1,
          question: "What is the most important factor in urban transport planning?",
          options: ["Vehicle speed", "Population density and land use patterns", "Road width", "Fuel prices"],
          correct: 1,
          explanation: "Population density and land use patterns determine travel demand, origins, and destinations, making them crucial for effective urban transport planning."
        },
        {
          id: 2,
          question: "Which transport mode typically has the highest capacity per hour in urban areas?",
          options: ["Private cars", "Buses", "Rail/Metro systems", "Bicycles"],
          correct: 2,
          explanation: "Rail and metro systems can carry 30,000-80,000 passengers per hour per direction, far exceeding other urban transport modes."
        },
        {
          id: 3,
          question: "What does 'modal split' refer to in urban transport?",
          options: ["Breaking transport infrastructure", "Dividing transport costs", "The proportion of trips made by different transport modes", "Splitting transport routes"],
          correct: 2,
          explanation: "Modal split describes the percentage share of total trips made by different transport modes (walking, cycling, public transport, private vehicles)."
        }
      ],
      'supply-chain': [
        {
          id: 1,
          question: "In supply chain design, what is the primary trade-off in transport decisions?",
          options: ["Speed vs. reliability", "Cost vs. service level", "Capacity vs. flexibility", "All of the above"],
          correct: 3,
          explanation: "Supply chain transport decisions involve multiple trade-offs: cost vs. service level, speed vs. reliability, and capacity vs. flexibility, all of which must be balanced."
        },
        {
          id: 2,
          question: "What is 'just-in-time' delivery's main impact on transport requirements?",
          options: ["Reduces transport costs", "Increases transport frequency and reliability needs", "Eliminates need for warehouses", "Reduces product quality requirements"],
          correct: 1,
          explanation: "Just-in-time delivery requires more frequent, reliable transport services to maintain low inventory levels while ensuring production continuity."
        },
        {
          id: 3,
          question: "Which factor most influences the choice between rail and road for freight transport?",
          options: ["Weather conditions", "Distance and volume", "Driver availability", "Fuel type"],
          correct: 1,
          explanation: "Distance and volume are key factors: rail is more cost-effective for long distances and high volumes, while road offers flexibility for shorter distances and smaller shipments."
        }
      ],
      'regional-connectivity': [
        {
          id: 1,
          question: "What is the primary challenge in connecting rural areas to urban centers?",
          options: ["High construction costs vs. low population density", "Lack of skilled drivers", "Poor weather conditions", "Limited fuel availability"],
          correct: 0,
          explanation: "The main challenge is economic: high infrastructure costs must be justified by relatively low population density and transport demand in rural areas."
        },
        {
          id: 2,
          question: "Which transport investment typically provides the best return for regional development?",
          options: ["Airports only", "Roads connecting to main networks", "High-speed rail", "Maritime ports"],
          correct: 1,
          explanation: "Roads that connect to main transport networks provide the best return as they enable access to markets, services, and opportunities with relatively lower investment."
        },
        {
          id: 3,
          question: "What role does transport accessibility play in economic development?",
          options: ["No significant impact", "Reduces local employment", "Enables market access and economic opportunities", "Only affects tourism"],
          correct: 2,
          explanation: "Transport accessibility is crucial for economic development as it enables access to markets, inputs, services, and employment opportunities."
        }
      ]
    };
    
    return questions[scenarioId] || [];
  }
  
  // Key concepts for each transport mode
  static getTransportModeConcepts(modeId) {
    const concepts = {
      maritime: {
        keyTerms: {
          "TEU": "Twenty-foot Equivalent Unit - standard container measurement",
          "Deadweight": "Maximum cargo weight a ship can carry",
          "Ballast": "Water used to maintain ship stability when cargo hold is empty",
          "Transhipment": "Transfer of cargo between vessels at intermediate ports"
        },
        principles: [
          "Economies of scale - larger ships are more cost-effective per container",
          "Hub-and-spoke networks concentrate cargo flows through major ports",
          "Seasonal routes adapt to weather patterns and demand variations",
          "Intermodal connectivity determines port competitiveness"
        ],
        calculations: {
          "Shipping cost per TEU": "Total voyage cost / Number of containers",
          "Port productivity": "Containers handled / Time period",
          "Vessel utilization": "Cargo carried / Total capacity"
        }
      },
      rail: {
        keyTerms: {
          "Gauge": "Distance between rail tracks (standard: 1,435mm)",
          "Intermodal": "Transport using multiple modes with standardized containers",
          "Block train": "Train carrying single commodity between fixed points",
          "Piggyback": "Truck trailers carried on rail flatcars"
        },
        principles: [
          "Fixed costs are high, variable costs are low",
          "Efficient for high-volume, long-distance transport",
          "Network effects - connectivity increases system value",
          "Loading/unloading times affect overall journey time"
        ],
        calculations: {
          "Train capacity": "Number of cars × Average car capacity",
          "Load factor": "Actual cargo / Maximum capacity",
          "Cost per ton-km": "Total cost / (Tons × Distance)"
        }
      },
      road: {
        keyTerms: {
          "GVW": "Gross Vehicle Weight - total weight of vehicle plus cargo",
          "LTL": "Less Than Truckload - shipments not filling entire truck",
          "FTL": "Full Truckload - shipment fills entire truck capacity",
          "Backhaul": "Return journey cargo to avoid empty truck movements"
        },
        principles: [
          "High flexibility - door-to-door service capability",
          "Variable costs dominate (fuel, driver wages)",
          "Congestion increases costs and unreliability",
          "Regulations affect driving hours and vehicle weights"
        ],
        calculations: {
          "Vehicle utilization": "Revenue km / Total km driven",
          "Fuel efficiency": "Distance / Fuel consumption",
          "Cost per delivery": "Total costs / Number of deliveries"
        }
      },
      air: {
        keyTerms: {
          "ULD": "Unit Load Device - containers for air cargo",
          "Yield management": "Pricing strategy to maximize revenue",
          "Hub airport": "Central airport for airline's route network",
          "Belly cargo": "Freight carried in passenger aircraft cargo holds"
        },
        principles: [
          "Speed advantage comes at premium cost",
          "Weight and volume limitations affect cargo types",
          "Hub-and-spoke networks maximize aircraft utilization",
          "Weather and air traffic control cause delays"
        ],
        calculations: {
          "Revenue per ton-km": "Total revenue / (Tons × Distance)",
          "Aircraft utilization": "Flight hours / Available hours",
          "Load factor": "Actual cargo weight / Maximum capacity"
        }
      },
      pipeline: {
        keyTerms: {
          "Throughput": "Volume of product flowing through pipeline per time",
          "Pumping station": "Facilities that maintain pressure in pipeline",
          "Batch shipping": "Sending different products sequentially",
          "SCADA": "System for monitoring and controlling pipeline operations"
        },
        principles: [
          "Very high capital costs, very low operating costs",
          "Continuous operation provides cost advantages",
          "Limited to liquid and gas products",
          "Geographic constraints determine route feasibility"
        ],
        calculations: {
          "Pipeline capacity": "Flow rate × Operating hours",
          "Utilization rate": "Actual throughput / Design capacity",
          "Cost per unit": "Annual costs / Annual throughput"
        }
      }
    };
    
    return concepts[modeId] || {};
  }
  
  // Case studies for real-world examples
  static getCaseStudies(scenarioId, modeId) {
    const caseStudies = {
      'global-trade': {
        maritime: {
          title: "Maersk Triple-E Class Container Ships",
          description: "Analysis of how the world's largest container ships revolutionized global trade",
          keyPoints: [
            "Economies of scale: 18,000+ TEU capacity reduces cost per container",
            "Environmental efficiency: 50% less CO2 per container vs. smaller ships", 
            "Port infrastructure: Required investment in deeper berths and larger cranes",
            "Supply chain impact: Enabled cost reductions but increased port concentration"
          ],
          metrics: {
            "Length": "400 meters",
            "Capacity": "18,270 TEU",
            "Fuel efficiency": "37% better than predecessor ships"
          }
        },
        rail: {
          title: "China-Europe Railway Express",
          description: "Belt and Road Initiative connecting Asia and Europe by rail",
          keyPoints: [
            "Alternative to sea route: 15-20 days vs. 35-45 days by ship",
            "Multimodal integration: Connects with road and sea transport",
            "Economic impact: Reduced logistics costs for high-value goods",
            "Geopolitical significance: Strengthened trade relationships"
          ],
          metrics: {
            "Distance": "Up to 13,000 km",
            "Journey time": "15-20 days",
            "Annual trains": "Over 15,000 (2021)"
          }
        }
      },
      'urban-commuting': {
        rail: {
          title: "Tokyo Metropolitan Rail Network",
          description: "World's most extensive urban rail system serving 40 million people",
          keyPoints: [
            "Network integration: Multiple operators with coordinated services",
            "High frequency: Trains every 2-4 minutes during peak hours",
            "Modal integration: Seamless connections with buses and subways",
            "Land use planning: Dense development around stations"
          ],
          metrics: {
            "Daily passengers": "40 million",
            "Network length": "2,700 km",
            "On-time performance": "99%"
          }
        },
        road: {
          title: "Curitiba Bus Rapid Transit",
          description: "Pioneering BRT system that inspired cities worldwide",
          keyPoints: [
            "Dedicated lanes: Bus-only corridors with traffic light priority",
            "Station design: Subway-style boarding reduces dwell time",
            "Integrated planning: Coordinated with land use development",
            "Cost effectiveness: 1/100th the cost of subway systems"
          ],
          metrics: {
            "Daily passengers": "2.3 million",
            "Average speed": "32 km/h",
            "Cost": "$200,000 per km vs. $20M for subway"
          }
        }
      }
    };
    
    return caseStudies[scenarioId]?.[modeId] || {};
  }
  
  // Interactive exercises
  static getInteractiveExercises(scenarioId) {
    const exercises = {
      'global-trade': [
        {
          type: "route-planning",
          title: "Optimize Asia-Europe Container Route", 
          description: "Plan the most cost-effective route from Shanghai to Rotterdam considering canal fees, fuel costs, and transit times.",
          parameters: {
            origin: "Shanghai",
            destination: "Rotterdam", 
            cargo: "2000 TEU containers",
            priorities: ["cost", "time", "reliability"]
          }
        },
        {
          type: "capacity-planning",
          title: "Port Terminal Expansion Decision",
          description: "Analyze whether to expand existing port capacity or develop new terminal based on traffic forecasts.",
          parameters: {
            currentCapacity: "5M TEU/year",
            forecasts: "8M TEU by 2030",
            options: ["expand existing", "build new", "do nothing"]
          }
        }
      ],
      'urban-commuting': [
        {
          type: "network-design",
          title: "Design Metro Network for Growing City",
          description: "Create efficient rail network connecting residential areas to business district for 2 million population city.",
          parameters: {
            population: "2 million",
            area: "500 km²",
            budget: "$10 billion",
            timeline: "10 years"
          }
        }
      ]
    };
    
    return exercises[scenarioId] || [];
  }
  
  // Performance benchmarks for assessment
  static getPerformanceBenchmarks() {
    return {
      cost_efficiency: {
        excellent: "< $2/ton-km",
        good: "$2-5/ton-km", 
        fair: "$5-10/ton-km",
        poor: "> $10/ton-km"
      },
      time_efficiency: {
        excellent: "< 24 hours",
        good: "24-48 hours",
        fair: "48-72 hours", 
        poor: "> 72 hours"
      },
      environmental_impact: {
        excellent: "< 20g CO2/ton-km",
        good: "20-50g CO2/ton-km",
        fair: "50-100g CO2/ton-km",
        poor: "> 100g CO2/ton-km"
      },
      reliability: {
        excellent: "> 95% on-time",
        good: "90-95% on-time",
        fair: "80-90% on-time",
        poor: "< 80% on-time"
      }
    };
  }
  
  // Learning objectives for each scenario
  static getLearningObjectives(scenarioId) {
    const objectives = {
      'global-trade': [
        "Understand the role of geography in international trade patterns",
        "Analyze factors affecting modal choice for long-distance freight",
        "Evaluate the impact of transport costs on global supply chains",
        "Assess the importance of transport infrastructure in economic development"
      ],
      'urban-commuting': [
        "Examine the relationship between urban form and transport demand",
        "Compare the capacity and efficiency of different urban transport modes", 
        "Analyze the role of public transport in sustainable urban development",
        "Evaluate transport policies for reducing congestion and emissions"
      ],
      'supply-chain': [
        "Understand the integration of transport in supply chain management",
        "Analyze trade-offs between inventory costs and transport costs",
        "Evaluate the impact of transport reliability on supply chain performance",
        "Assess strategies for supply chain risk management"
      ],
      'regional-connectivity': [
        "Examine the role of transport in regional economic development",
        "Analyze the challenges of providing transport services to rural areas",
        "Evaluate the social benefits of improved transport connectivity",
        "Assess investment priorities for transport infrastructure development"
      ]
    };
    
    return objectives[scenarioId] || [];
  }
}

// Export for use in other modules
if (typeof window !== 'undefined') {
  window.EducationalContent = EducationalContent;
}