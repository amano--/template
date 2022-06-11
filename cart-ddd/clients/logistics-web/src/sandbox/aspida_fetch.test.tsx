import axiosClient from '@aspida/axios'
import api from '../../auto/openapi/aspida/$api'
import type { Pet } from '../../auto/openapi/aspida/@types'

describe('simple test', () => {
  it('dom draw', async () => {
    const client = api(axiosClient())
    const petId = 100
    const body: Pet = {
      id: petId,
      name: 'hoge',
      photoUrls: [],
      status: 'available',
    }

    await client.pet.$post({ body })
    const pet = await client.pet._petId(petId).$get()
    console.log(pet)
  })
})
