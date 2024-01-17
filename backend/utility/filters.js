class Filter {
    constructor(query, filter) {
        this.query = query;
        this.filter = filter;
    }

    search() {
        const keyword = this.filter.keyword ? {
            name: {
                $regex: this.filter.keyword,
                $options: "i",
            },
        } : {
        }
        this.query = this.query.find({...keyword});
        return this;
    }

    addFilters() {
        // Creating temp variable to remove keyword field from search when filtering by other options
        const tempQuery = {...this.filter};
        const removeFields = ["keyword", "page"];
        removeFields.forEach(field => delete tempQuery[field]);

        // Advanced filtering method to convert the query to JSON to work with built in mongoose gte(greater than or equal to), lte (less than or equal to) operators
        let filter = JSON.stringify(tempQuery);

        // Using regex to replace gte and lte operators with $gte and $lte operators
        // /g indicates global search
        // /b(...)\b means it will search for matches for whatever is in between the ()
        // Once a match is found, this line adds a $ to the beginning in order to work as a MongoDB operator
        filter = filter.replace(/\b(gte|lte)\b/g, match => `$${match}`);

        this.query = this.query.find(JSON.parse(filter));
        return this;
    }

    addPagination(resultLimit) {
        const current = Number(this.filter.page) || 1;
        const offset = (current - 1) * resultLimit;

        this.query = this.query.skip(offset).limit(resultLimit);
        return this;
    }
}

module.exports = Filter;