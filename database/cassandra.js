const cass = require('cassandra-driver');
const client = new cass.Client(
{ contactPoints: ['127.0.0.1:9042']
, keyspace: 'reviews'
, localDataCenter: 'datacenter1'
});

const revInsQuery = 
    `insert into items 
        (id, username, title, review, stars, productId, foundHelpful)
        values 
        (?,  ?,            ?,         ?,      ?,     ?,     ?);
    `

/** 
 * @param {Array} items - [id, username, title, review, stars, productId, foundHelpful];
 * Insert an array of values into the Cassandra DB.
 */
const insertReview = async (reviewArr) => {
    let {id, username, title, review, stars, productId, foundHelpful} = reviewObj;
    let params = [id, username, title, review, stars, productId, foundHelpful];
    let res = await client.execute(revInsQuery, params, {prepare: true});
}

module.exports = 
{ insertReview
,
}