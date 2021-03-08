import { Router } from "express" //imports Router type 
const { Sequelize } = require('sequelize');
const express = require('express')
const cors = require('cors')
const app = express()
const {SQL_URI} = process.env

const sequelize = new Sequelize(SQL_URI)
