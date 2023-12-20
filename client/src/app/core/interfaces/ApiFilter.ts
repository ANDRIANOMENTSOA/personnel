import { AnyObject, AnyModel } from "./AnyObject";

/**
@deprecate Use Filter from @loopback/filter instead
*/
export interface ApiFilter<MT extends object = AnyObject> {
    /**
     * The matching criteria
     */
    where?: Where<MT>;
    /**
     * To include/exclude fields
     */
    fields?: Fields<MT>;
    /**
     * Sorting order for matched entities. Each item should be formatted as
     * `fieldName ASC` or `fieldName DESC`.
     * For example: `['f1 ASC', 'f2 DESC', 'f3 ASC']`.
     *
     * We might want to use `Order` in the future. Keep it as `string[]` for now
     * for compatibility with LoopBack 3.x.
     */
    order?: string[];
    /**
     * Maximum number of entities
     */
    limit?: number;
    /**
     * Skip N number of entities
     */
    skip?: number;
    /**
     * Offset N number of entities. An alias for `skip`
     */
    offset?: number;
    /**
     * To include related objects
     */
    include?: Inclusion[];
}

const nonWhereFields = [
    "fields",
    "order",
    "limit",
    "skip",
    "offset",
    "include",
];

const filterFields = ["where", ...nonWhereFields];

/**
 * Operators for where clauses
 */
export type Operators =
    | "eq" // Equal
    | "neq" // Not Equal
    | "gt" // >
    | "gte" // >=
    | "lt" // <
    | "lte" // <=
    | "inq" // IN
    | "nin" // NOT IN
    | "between" // BETWEEN [val1, val2]
    | "exists"
    | "and" // AND
    | "or" // OR
    | "like" // LIKE
    | "nlike" // NOT LIKE
    | "ilike" // ILIKE'
    | "nilike" // NOT ILIKE
    | "regexp" // REGEXP'
    | "json";

/**
 * Matching predicate comparison
 */
export interface PredicateComparison<PT> {
    eq?: PT;
    neq?: PT;
    gt?: PT;
    gte?: PT;
    lt?: PT;
    lte?: PT;
    inq?: PT[];
    nin?: PT[];
    between?: [PT, PT];
    exists?: boolean;
    like?: PT;
    nlike?: PT;
    ilike?: PT;
    nilike?: PT;
    regexp?: string | RegExp;
    json?: string;
    // [extendedOperation: string]: any;
}

/**
 * Value types for `{propertyName: value}`
 */
export type ShortHandEqualType = string | number | boolean | Date;

/**
 * Key types of a given model, excluding operators
 */
export type KeyOf<MT extends object> = Exclude<
    Extract<keyof MT, string>,
    Operators
>;

/**
 * Condition clause
 *
 * @example
 * ```ts
 * {
 *   name: {inq: ['John', 'Mary']},
 *   status: 'ACTIVE',
 *   age: {gte: 40}
 * }
 * ```
 */
export type Condition<MT extends object> = {
    [P in KeyOf<MT>]?:
    | PredicateComparison<MT[P]> // {x: {lt: 1}}
    | (MT[P] & ShortHandEqualType); // {x: 1},
};

/**
 * Where clause
 *
 * @example
 * ```ts
 * {
 *   name: {inq: ['John', 'Mary']},
 *   status: 'ACTIVE'
 *   and: [...],
 *   or: [...],
 * }
 * ```
 */

export interface Inclusion {
    relation: string;
    scope?: ApiFilter<AnyObject>;
}

export type Where<MT extends object = AnyObject> =
    | Condition<MT>
    | AndClause<MT>
    | OrClause<MT>;

/**
 * And clause
 *
 * @example
 * ```ts
 * {
 *   and: [...],
 * }
 * ```
 */
export interface AndClause<MT extends object> {
    and: Where<MT>[];
}

/**
 * Or clause
 *
 * @example
 * ```ts
 * {
 *   or: [...],
 * }
 * ```
 */
export interface OrClause<MT extends object> {
    or: Where<MT>[];
}

/**
 * Order by direction
 */
export type Direction = "ASC" | "DESC";

/**
 * Order by
 *
 * Example:
 * `{afieldname: 'ASC'}`
 */
export type Order<MT = AnyObject> = { [P in keyof MT]: Direction };

/**
 * Selection of fields
 *
 * Example:
 * `{afieldname: true}`
 */
export type Fields<MT = AnyObject> = { [P in keyof MT]?: boolean };

export interface AggregationFilter<MT extends AnyModel> extends ApiFilter<MT> {
    group_by: string[];
    aggregates: {
        [property: string]: string;
    };
}