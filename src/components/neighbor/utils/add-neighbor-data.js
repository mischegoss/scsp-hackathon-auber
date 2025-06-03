// Since browser can't write to files directly, this stores data in memory for demo purposes
// and provides methods to view the JSON for manual saving

class NeighborDataManager {
  constructor() {
    this.data = []
    this.initialized = false
  }

  // Initialize with any existing data (if available)
  async initialize() {
    if (this.initialized) return

    // In a real app, you could try to load existing data from localStorage
    // or from an uploaded file, but for demo purposes we'll start fresh
    this.data = []
    this.initialized = true
    console.log('📂 Neighbor data manager initialized')
  }

  // Add new neighbor data entry
  async addNeighborData(formData) {
    await this.initialize()

    // Validate the data structure
    if (!this.validateData(formData)) {
      throw new Error('Invalid data format')
    }

    // Add timestamp if not present
    if (!formData.timestamp) {
      formData.timestamp = new Date().toISOString()
    }

    // Add to the data array
    this.data.push(formData)

    console.log('✅ Added neighbor data:', formData)
    console.log('📊 Total entries:', this.data.length)
    console.log('💾 Updated JSON data:')
    console.log(JSON.stringify(this.data, null, 2))

    // Log instructions for saving
    console.log('📝 To save this data to your JSON file:')
    console.log('1. Copy the JSON data above')
    console.log('2. Paste it into src/data/neighbor-data.json')
    console.log('3. Or call getAllNeighborData() to get the current data array')

    return true
  }

  // Validate data structure matches expected format
  validateData(data) {
    return (
      data &&
      Array.isArray(data.needs) &&
      data.needs.length > 0 &&
      typeof data.urgency === 'number' &&
      data.urgency >= 1 &&
      data.urgency <= 5 &&
      typeof data.zipCode === 'string' &&
      data.zipCode.length > 0
    )
  }

  // Get all stored data
  async getAllData() {
    await this.initialize()
    return [...this.data] // Return a copy
  }

  // Get JSON string for manual saving
  async getJSONString() {
    await this.initialize()
    return JSON.stringify(this.data, null, 2)
  }

  // Clear all data (for testing)
  clearData() {
    this.data = []
    console.log('🗑️ All neighbor data cleared')
  }

  // Get summary of collected data
  getSummary() {
    const summary = {
      totalEntries: this.data.length,
      byZipCode: {},
      byUrgency: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
      byNeeds: {
        'narcan-access': 0,
        'narcan-training': 0,
      },
    }

    this.data.forEach(entry => {
      // Count by zip code
      summary.byZipCode[entry.zipCode] =
        (summary.byZipCode[entry.zipCode] || 0) + 1

      // Count by urgency
      summary.byUrgency[entry.urgency]++

      // Count by needs
      entry.needs.forEach(need => {
        if (summary.byNeeds[need] !== undefined) {
          summary.byNeeds[need]++
        }
      })
    })

    return summary
  }
}

// Create a singleton instance
const neighborDataManager = new NeighborDataManager()

// Export functions
export async function addNeighborData(formData) {
  return await neighborDataManager.addNeighborData(formData)
}

export async function getAllNeighborData() {
  return await neighborDataManager.getAllData()
}

export async function getNeighborDataJSON() {
  return await neighborDataManager.getJSONString()
}

export function clearNeighborData() {
  return neighborDataManager.clearData()
}

export function getNeighborDataSummary() {
  return neighborDataManager.getSummary()
}

// Default export
export default {
  addNeighborData,
  getAllNeighborData,
  getNeighborDataJSON,
  clearNeighborData,
  getNeighborDataSummary,
}
