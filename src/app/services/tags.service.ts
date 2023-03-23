import { Injectable } from '@angular/core';
import { addRxPlugin, createRxDatabase, RxCollection, RxDatabase } from 'rxdb';
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';
import { BehaviorSubject } from 'rxjs';
import { tagsSchema } from '../core/schemas/tags-schema.model';
import { IList } from '../models/list.interface';
import { ITag } from '../models/tag.interface';

@Injectable({
  providedIn: 'root'
})
export class TagsService {
    /**
 * Gets or sets if service has been initialized.
 */
  public isInitialized: boolean = false;

  private readonly databaseKey: string = 'tags';

  /**
   * Database that holds destinations.
   */
  private database: RxDatabase | undefined;
  private collection: { tags: RxCollection } | undefined;

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
      tags: {
        schema: tagsSchema
      }
    });
    this.isInitialized = true;

  }

  /**
 * Adds new tag to database.
 * @param list
 */
  public async addTag(tag: ITag): Promise<void> {
    await this.database![this.databaseKey].insert(tag);
  }

  /**
   * Gets tag from database with the given name.
   * @returns
   */
  public getTagByName(name: string): BehaviorSubject<any> {
    return this.database![this.databaseKey].findOne({
      selector: {
        name: {
          $eq: name
        }
      }
    }).$;
  }

  /**
   * Gets tags from database
   * @returns
   */
  public getTags(): BehaviorSubject<any[]> {
    return this.database![this.databaseKey].find().$;
  }

}