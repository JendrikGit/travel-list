import { IItemBase } from "./item-base.interface";

/**
 * Represents user created list.
 */
export interface IList extends IItemBase {
    /**
     * Gets or sets name of the list.
     */
    name: string;
}