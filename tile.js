"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tile = void 0;
const terrain_1 = require("./terrain");
class Tile {
    constructor(terrain, tileNumber) {
        this.terrain = new terrain_1.Terrain(terrain);
        this.terrainType = this.terrain.terrain;
        this.resourceType = this.terrain.resource;
        this.tileNumber = this._setTileNumber(tileNumber);
        this.settlements = [];
        this.cities = [];
        this.roads = [];
        this.id = this._setTileId();
    }
    addSettlementToTile(settlement) {
        if (settlement.inPlay == true) {
            throw new Error("This settlement has already been placed down");
        }
        else if (this.settlements.length < 3) {
            this.settlements.push(settlement);
            settlement.inPlay = true;
        }
        else {
            throw new Error("You cant add more than 3 settlements to a tile");
        }
    }
    removeSettlementFromTile(settlement) {
        if (settlement.inPlay == false) {
            throw new Error("This settlement isn't on the board");
        }
        else {
            let iter = 0;
            for (const r of this.settlements) {
                if (r.id == settlement.id) {
                    this.settlements.splice(iter, 1);
                    settlement.inPlay = false;
                    return true;
                }
                iter += 1;
            }
            return false;
        }
    }
    addCityToTile(settlement, city) {
        if (city.inPlay == true) {
            throw new Error("This City is already on the board");
        }
        else if (!this.removeSettlementFromTile(settlement)) {
            throw new Error("That settlement isn't on this tile");
        }
        this.cities.push(city);
        settlement.inPlay = false;
        city.inPlay = true;
    }
    addRoadToTile(road) {
        if (road.inPlay == true) {
            throw new Error("This road is already on the board");
        }
        if (this.roads.length < 6) {
            this.roads.push(road);
            road.inPlay = true;
        }
        else {
            throw new Error("You can't add more than 6 roads to a a tile");
        }
    }
    _setTileId() {
        if (Tile.nextId > 19n) {
            throw new Error("You can't have more than 18 tiles on a board");
        }
        return Tile.nextId++;
    }
    _setTileNumber(tileNumber) {
        if (tileNumber > 12n) {
            throw new Error("Tile number cannot be greater than 12");
        }
        else {
            return tileNumber;
        }
    }
}
exports.Tile = Tile;
Tile.nextId = 1n;
