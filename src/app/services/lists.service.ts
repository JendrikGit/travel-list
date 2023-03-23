import { Injectable } from '@angular/core';
import { createRxDatabase, RxCollection, RxDatabase } from 'rxdb';
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';
import { BehaviorSubject } from 'rxjs';
import { listsSchema } from '../core/schemas/lists-schema.model';
import { IList } from '../models/list.interface';

@Injectable({
  providedIn: 'root'
})
export class ListsService {
    /**
   * Gets or sets if service has been initialized.
   */
  public isInitialized: boolean = false;

  private readonly databaseKey: string = 'lists';

  /**
   * Database that holds destinations.
   */
  private database: RxDatabase | undefined;
  private collection: { lists: RxCollection } | undefined;

  constructor() {
    this.setupDatabase();
  }

  private async setupDatabase(): Promise<void> {
    // Creates new database.
    this.database = await createRxDatabase({
      name: this.databaseKey,
      storage: getRxStorageDexie()
    });

    // Creates collection in the database with given schema.
    this.collection = await this.database.addCollections({
      lists: {
        schema: listsSchema
      }
    });
    
    this.isInitialized = true;
  }

  /**
 * Adds new list to database.
 * @param list
 */
  public async addList(list: IList): Promise<void> {
    await this.database![this.databaseKey].insert(list);
  }

  /**
   * Gets list from database with the given name.
   * @returns
   */
  public getListsByName(name: string): BehaviorSubject<any> {
    return this.database![this.databaseKey].findOne({
      selector: {
        name: {
          $eq: name
        }
      }
    }).$;
  }

  /**
   * Gets lists from database
   * @returns
   */
  public getLists(): BehaviorSubject<any[]> {
    return this.database![this.databaseKey].find().$;
  }

}