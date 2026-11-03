import { Controller, Get, NotFoundException, Param, Query } from '@nestjs/common';
import { IMPACT, MOTORCYCLE, NEWS, PLANS, STATIONS, STATS } from '../data/catalog.data';

@Controller()
export class CatalogController {
  @Get('stations')
  listStations(@Query('commune') commune?: string) {
    if (!commune) return STATIONS;
    return STATIONS.filter((s) => s.commune.toLowerCase() === commune.toLowerCase());
  }

  @Get('stations/:id')
  getStation(@Param('id') id: string) {
    const station = STATIONS.find((s) => s.id === id);
    if (!station) throw new NotFoundException('Station introuvable');
    return station;
  }

  @Get('motorcycle')
  getMotorcycle() {
    return MOTORCYCLE;
  }

  @Get('plans')
  listPlans() {
    return PLANS;
  }

  @Get('stats')
  listStats() {
    return STATS;
  }

  @Get('impact')
  listImpact() {
    return IMPACT;
  }

  @Get('news')
  listNews() {
    return NEWS;
  }
}
