class APIFeatures {

	constructor(query, queryStr){
		this.query = query;
		this.queryStr = queryStr;

	}

	search(){
		//using turnary operator 
	const keyword = this.queryStr.keyword ? {
		name: {
			$regex: this.queryStr.keyword, // $regex is a mongo operator that provides regular expression capabilities for pattern matching strings in queries
			$options: 'i'  //i flag which means we are making our search case insensitive.
		}
	} : {} //or empty object 
	
	console.log(keyword);

	this.query = this.query.find({ ...keyword });

	return this;

	}

	filter(){
		const queryCopy = { ...this.queryStr};

		console.log(queryCopy);

		//Removing fields from query
		const removeFields = ['keyword', 'limit', 'page'] //here we remove keyword , limit, page 

		removeFields.forEach(el => delete queryCopy[el]);

		console.log(queryCopy);
		
		//Advance filter for price, ratings etc
		
		let queryStr = JSON.stringify(queryCopy)
		queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`)//using dollar sign bcz its mongo operator
		//here gte means greter_then_equalto
		// gt means greater_then
		//lte means less then equal to
		//lt means less then



		console.log(queryStr);
		this.query = this.query.find(JSON.parse(queryStr));
		return this;
	}

	pagination(resPerPage){
		const currentPage = Number(this.queryStr.page)||1; //by default 1 page
		const skip = resPerPage * (currentPage - 1);

		this.query = this.query.limit(resPerPage).skip(skip);
		return this;

	}

	sort() { 
   if (this.queryStr.sort) { 
       const sortBy = this.queryStr.sort.split(',').join(' '); 
       this.query = this.query.sort(sortBy); 
    }
    return this;
 }

}

module.exports = APIFeatures