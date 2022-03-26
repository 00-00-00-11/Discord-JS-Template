/**
 * Dentro desta pasta crie um arquivo .env e escreva nele:
 * @TOKEN="SEU_TOKEN_AQUI"
 * */

require('dotenv').config({ path:'config/.env' })
module.exports = {
	TOKEN: process.env.TOKEN,
	prefix: "-"
}