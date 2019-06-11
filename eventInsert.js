var ibmdb = require('ibm_db');
/**
  * Insert a new event record
  *
  * Written by Henrik Loeser
  */

function insertEvent(dsn, eventValues) {
 try {
    var conn=ibmdb.openSync(dsn);
    // The timestamp value is derived from date and time values passed in
    var data=conn.querySync("insert into events(shortname, location, begindate, enddate, contact) values(?,?,timestamp_format(?||' '||?,'YYYY-MM-DD HH24:MI:SS'),timestamp_format(?||' '||?,'YYYY-MM-DD HH24:MI:SS'),?)", eventValues);
    conn.closeSync();
    return {result : data};
 } catch (e) {
     return { dberror : e }
 }
}

function main({eventValues, __bx_creds: {dashDB:{dsn}}}) {
	return insertEvent(dsn,eventValues);
}
