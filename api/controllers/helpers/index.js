async function formatJSON(errors = [], values = [], model) {
	try {
		const total = await model.count()
		values = Array.isArray(values) ? values : [values]
		return { errors, values, total }
	} catch (error) {
		return { errors, values, total: 0 }
	}
}

function sortAggregater(query) {
	let count = -1
	if (query['sort_by']) {
		count = ['ascending', 'asc', '1'].includes(query['sort_by']) ? 1 : -1
	}
	return [{ $sort: { count } }]
}

function groupAggregater(query) {
	query['group_by'] = query['group_by'] || 'id'
	const $group = { _id: '$'.concat(query['group_by']), count: { $sum: 1 } }
	return query['group_by'] === 'category'
		? [...unwindAggregater(query['group_by']), { $group }]
		: [{ $group }]
}

function unwindAggregater(attribute) {
	return [{ $unwind: '$'.concat(attribute) }]
}

exports.formatJSON = formatJSON
exports.sortAggregater = sortAggregater
exports.groupAggregater = groupAggregater
exports.unwindAggregater = unwindAggregater
