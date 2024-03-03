#!/bin/bash

set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
	CREATE USER cosmetic WITH PASSWORD "$POSTGRES_PASSWORD";
	CREATE DATABASE cosmetic_db;
	GRANT ALL PRIVILEGES ON DATABASE cosmetic TO cosmetic_db;
EOSQL

