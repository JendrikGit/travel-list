import { RxJsonSchema } from "rxdb";
import { IDestination } from "src/app/models/destination.interface";
import { IList } from "src/app/models/list.interface";
import { ITag } from "src/app/models/tag.interface";

/**
 * Collection schema for tags.
 */
export const tagsSchema: RxJsonSchema<ITag>  = {
    title: 'tags schema',
    version: 0,
    primaryKey: 'id',
    type: 'object',
    properties: {
        id: {
            type: 'string',
            maxLength: 100 // <- the primary key must have set maxLength
        },
        name: {
            type: 'string',
        },
    },
    required: ['id', 'name']
}