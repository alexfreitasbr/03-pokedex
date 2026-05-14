import { BadRequestException, Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';

@Injectable()
export class SeedService {
  private readonly axios: AxiosInstance = axios.create();

  async executedSEED() {
    try {
      const { data } = await this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=10')
      
      const filtered = data.results.map((item)=>{
        const segments = item.url.split('/')

        return {
          name:item.name,
          no:+segments[segments.length -2]
        }
      })
      
      return filtered
    } catch (error) {
      throw new BadRequestException(`Pokemon does not exists in DB ${error}`)
    }
  }
}
