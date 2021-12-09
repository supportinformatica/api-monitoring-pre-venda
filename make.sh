test -f .env && (rm .env && > .env) || > .env

read -p 'Set default environment (Y|N): ' results

if [ "$results" == "y" ] || [ "$results" == "Y" ] 
  then 
    echo "NODE_ENV=development" >> .env
    echo "HOST=0.0.0.0" >> .env
    echo "PORT=8080" >> .env
    echo >> .env
    echo "AUTH_KEY_SECURITY=secret" >> .env
    echo "AUTH_KEY_TOKEN_EXPIRES=300000" >> .env
    echo >> .env
    echo "MSSQL_HOST=localhost" >> .env
    echo "MSSQL_PORT=1433" >> .env
    echo "MSSQL_NAME=root" >> .env
    echo "MSSQL_USER=root" >> .env
    echo "MSSQL_PASS=root" >> .env
    echo >> .env
    echo "MONGO_HOST=localhost" >> .env
    echo "MONGO_PORT=27017" >> .env
    echo "MONGO_NAME=test" >> .env
    echo "MONGO_USER=root" >> .env
    echo "MONGO_PASS=root" >> .env

else 
  echo ""
  echo "### Server config ###"
  echo ""

  read -p 'Node environment (development): ' INPUT
    [ -z "$INPUT" ] && echo "NODE_ENV=development" >> .env || echo "NODE_ENV=$INPUT" >> .env

  read -p 'Server host (0.0.0.0): ' INPUT
    [ -z "$INPUT" ] && echo "HOST=0.0.0.0" >> .env || echo "HOST=$INPUT" >> .env


  read -p 'Server port (8080): ' INPUT
    [ -z "$INPUT" ] && echo "PORT=8080" >> .env || echo "PORT=$INPUT" >> .env

  echo >> .env
  echo ""
  echo "----------------------------"

  echo "### Auth config ###"
  echo ""

  read -p 'Auth key security (secret): ' INPUT
    [ -z "$INPUT" ] && echo "AUTH_KEY_SECURITY=secret" >> .env || echo "AUTH_KEY_SECURITY=$INPUT" >> .env

  read -p 'Auth key expires (300000): ' INPUT
    [ -z "$INPUT" ] && echo "AUTH_KEY_TOKEN_EXPIRES=300000" >> .env || echo "AUTH_KEY_TOKEN_EXPIRES=$INPUT" >> .env

  echo >> .env
  echo ""
  echo "----------------------------"

  echo "### SQL Server config ###"
  echo ""

  read -p 'SQL Server host (localhost): ' INPUT
    [ -z "$INPUT" ] && echo "MSSQL_HOST=localhost" >> .env || echo "MSSQL_HOST=$INPUT" >> .env

  read -p 'SQL Server port (1433): ' INPUT
    [ -z "$INPUT" ] && echo "MSSQL_PORT=1433" >> .env || echo "MSSQL_PORT=$INPUT" >> .env

  read -p 'SQL Server database (root): ' INPUT
    [ -z "$INPUT" ] && echo "MSSQL_NAME=root" >> .env || echo "MSSQL_NAME=$INPUT" >> .env

  read -p 'SQL Server user (root): ' INPUT
    [ -z "$INPUT" ] && echo "MSSQL_USER=root" >> .env || echo "MSSQL_USER=$INPUT" >> .env

  read -sp 'SQL Server password (root): ' INPUT
    [ -z "$INPUT" ] && echo "MSSQL_PASS=root" >> .env || echo "MSSQL_PASS=$INPUT" >> .env

  echo >> .env
  echo ""
  echo "----------------------------"

  echo "### Mongo config ###"
  echo ""

  read -p 'Mongo host (localhost): ' INPUT
    [ -z "$INPUT" ] && echo "MONGO_HOST=localhost" >> .env || echo "MONGO_HOST=$INPUT" >> .env

  read -p 'Mongo port (27017): ' INPUT
    [ -z "$INPUT" ] && echo "MONGO_PORT=27017" >> .env || echo "MONGO_PORT=$INPUT" >> .env

  read -p 'Mongo database (test): ' INPUT
    [ -z "$INPUT" ] && echo "MONGO_NAME=test" >> .env || echo "MONGO_NAME=$INPUT" >> .env

  read -p 'Mongo user (root): ' INPUT
    [ -z "$INPUT" ] && echo "MONGO_USER=root" >> .env || echo "MONGO_USER=$INPUT" >> .env

  read -sp 'Mongo password (root): ' INPUT
    [ -z "$INPUT" ] && echo "MONGO_PASS=root" >> .env || echo "MONGO_PASS=$INPUT" >> .env
  
  echo >> .env
  echo ""
  echo "----------------------------"
fi


echo "Successfully!!"
echo ""