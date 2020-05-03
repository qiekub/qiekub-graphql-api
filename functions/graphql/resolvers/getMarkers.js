module.exports = async (parent, args, context, info) => {
	const mongodb = context.mongodb

	return new Promise((resolve,reject)=>{
		mongodb.CompiledPlaces_collection.aggregate([
			{$project:{
				_id: "$_id",
				name: "$properties.name",
				lng: "$properties.geometry.location.lng",
				lat: "$properties.geometry.location.lat",
				preset: "$properties.tags.preset",
				tags: {
					min_age: "$properties.tags.min_age",
					max_age: "$properties.tags.max_age",
				},
			}},
		]).toArray((error,docs)=>{
			if (error) {
				reject(error)
			}else{
				resolve(docs)
			}
		})
	})
}