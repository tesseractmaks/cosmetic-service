import json

from kafka import KafkaConsumer, KafkaProducer


def get_consumer(topic):
    consumer = KafkaConsumer(
        f"{topic}",
        auto_offset_reset="earliest",
        bootstrap_servers=["kafka:9092"],
        api_version=(0, 10),
        max_poll_records=1000,
    )

    for records in consumer:

        record = json.loads(records.value)

        if consumer is not None:
            consumer.close()
        return record


def create_producer(values):
    kafka_producer = KafkaProducer(
        bootstrap_servers=["kafka:9092"],
        api_version=(0, 10),
        value_serializer=lambda x: json.dumps(x).encode("utf-8"),
    )
    try:
        kafka_producer.send(values["topic"], value=values)

        kafka_producer.flush()
    except Exception as exc:
        pass

    if kafka_producer is not None:
        kafka_producer.close()
