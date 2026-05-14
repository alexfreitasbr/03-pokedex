import { BadRequestException, Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {
  private readonly axios: AxiosInstance = axios.create();

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly http:AxiosAdapter,
  ) { }

  async executedSEED() {
    await this.pokemonModel.deleteMany({})
    try {
      const data = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650')
      
      const filtered = data.results.map((item)=>{
        const segments = item.url.split('/')

        return {
          name:item.name,
          no:+segments[segments.length -2]
        }
      })

      await this.pokemonModel.insertMany(filtered);
      
      return "Success to insert"

    } catch (error) {
      throw new BadRequestException(`Pokemon does not exists in DB ${error}`)
    }
  }
}
