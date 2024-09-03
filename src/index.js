module.exports.handler = async (event) => {
  // get list of records
  const eventList = event.Records;
  let result = { total: 0, recordsAdded: [] };
  if (eventList) {
    for (let i = 0; i < eventList.length; i++) {
      // decode base64 encoded data
      const recordData = JSON.parse(
        Buffer.from(eventList[i].kinesis.data, 'base64').toString('ascii')
      );
      // check for correct type
      if (recordData.type === 'booking_completed') {
        // construct body
        const body = {
          product_order_id_buyer: recordData.booking_completed.orderId,
          timestamp: new Date(recordData.booking_completed.timestamp),
          product_provider_buyer: recordData.booking_completed.product_provider,
        };
        // send post request
        try {
          const response = await fetch('http://localhost:3000', {
            method: 'POST',
            body: JSON.stringify(body),
          });
          const data = await response.json();
          // console.log(data);

          // check if response is ok and update result obj
          if (response.ok) {
            result.total++;
            result.recordsAdded.push(body);
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
    // console.log(result);
    return result;
  } else {
    return null;
  }
};
