import {Http, Response} from 'angular2/http';
import {Injectable} from 'angular2/core';

export type CivilizationId = string;
export type TechnologyId = string;
export type TechnologyType = string;

export interface Civilization {
    id: CivilizationId;
    name: string;
}

export interface Technology {
    id: TechnologyId;
    name: string;
    prerequisites: {
        age: number;
        civilizations: CivilizationId[];
        structure: TechnologyId;
    };
    type: TechnologyType;
    children: Map<TechnologyId, Technology>;
}

export interface Data {
    civilizations: Civilization[];
    technologies: Technology[];
    technology_tree: Object;
}

@Injectable()
export class DataService {
    protected dataPromise: Promise<Object>;

    constructor(protected http: Http) {}

    public getData() : Promise<Data> {
        if (this.dataPromise === undefined) {
            this.dataPromise = new Promise<Data>(resolve =>
                this.http.get('/app/data.json')
                    .map(res => res.json())
                    .subscribe(
                        data => resolve(data),
                        err => console.error(err)
                    )
            );
        }

        return this.dataPromise;
    }
}
