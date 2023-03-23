import { IItemBase } from "./item-base.interface";
import { IList } from "./list.interface";
import { ITag } from "./tag.interface";


/**
 * Model that represents destination.
 */
export interface IDestination extends IItemBase {
    /**
     * Gets or sets name of the destination.
     */
    destination: string;

    /**
     * Gets or sets name of the continent.
     */
    continent: string;

    /**
     * Gets or sets date of creation.
     */
    createdAt: String;

    /**
     * Gets or sets destination tag.
     */
    tag: ITag;

    /**
     * Gets or sets list where destination is saved.
     */
    list: IList;

    /**
     * Gets or sets if destination has been marked as done / visited.
     */
    done: boolean;


    /**
     * Gets or sets notes about destination.
     */
    notes: string;
}