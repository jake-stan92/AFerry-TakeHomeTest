const event = require('../event.json');
const { handler } = require('../dist/index');

const emptyEvent = {};
const dummyEventNoCorrectType = {
  Records: [
    {
      kinesis: {
        data:
          // eslint-disable-next-line max-len
          'eyJpZCI6ImE0Mzg4MTMxLTE0OTItMTFlYy1hMGIyLWM3OGZmYmQ2OTM0NyIsInBhcnRpdGlvbktleSI6ImM3NzI0YjA2LTgxM2QtNDEwYS1hZGJjLTdkMTllYmZmMDRiMiIsInRpbWVzdGFtcCI6MTYzMTUzODA1OTQ1OSwidHlwZSI6ImJvb2tpbmdfcmVxdWVzdGVkIiwiYm9va2luZ19yZXF1ZXN0ZWQiOnsidGltZXN0YW1wIjoxNjMxNTM4MDU5NDU5LCJvcmRlcklkIjoxMDAxNiwicHJvZHVjdF9wcm92aWRlciI6IkJyaXR0YW55IEZlcnJpZXMifX0=',
        partitionKey: 'c7724b06-813d-410a-adbc-7d19ebff04b2',
        approximateArrivalTimestamp: 1631538059459,
        kinesisSchemaVersion: '1.0',
        sequenceNumber: 'c7724b06-813d-410a-adbc-7d19ebff04b2',
      },
      eventSource: 'aws:kinesis',
      eventID:
        'shardId-000000000000:49545115243490985018280067714973144582180062593244200961',
      invokeIdentityArn: 'arn:aws:iam::EXAMPLE',
      eventVersion: '1.0',
      eventName: 'aws:kinesis:record',
      eventSourceARN: 'arn:aws:kinesis:EXAMPLE',
      awsRegion: 'us-east-1',
    },
  ],
};

describe('Testing event arguments', () => {
  it('Handles known valid data (./event.json) as argument', async () => {
    const result = await handler(event);
    expect(result).toBeTypeOf('object');
    expect(result).toHaveProperty('total', 25);
    expect(result).toHaveProperty('recordsAdded');
    expect(result.recordsAdded).toHaveLength(25);
    expect(result.recordsAdded[0]).toHaveProperty('product_order_id_buyer');
    expect(result.recordsAdded[0]).toHaveProperty('timestamp');
    expect(result.recordsAdded[0]).toHaveProperty('product_provider_buyer');
  });
  it('Handles event where no "booking_completed types are passed to func"', async () => {
    expect(await handler(dummyEventNoCorrectType)).toStrictEqual({
      total: 0,
      recordsAdded: [],
    });
  });
  it('Handles empty event passed to func', async () => {
    expect(await handler(emptyEvent)).toBe(null);
  });
});
