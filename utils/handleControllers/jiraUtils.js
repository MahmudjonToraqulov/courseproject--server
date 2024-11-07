const axios = require("axios");
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv')
const { createJiraIssueOptions } = require("../options/jiraOptions");
const app = express();
app.use(cors());
dotenv.config()
const URL = process.env.JIRA_URL
const USER = process.env.JIRA_USER
const TOKEN = process.env.JIRA_TOKEN
const project = 'SCRUM'
const auth = {
    username: USER,
    password: TOKEN
}


exports.getTasks = async(res, user)=>{
    try{
        return await axios.get(`${URL}/rest/api/3/search`, {
            params: {
                jql: `reporter = "${user.accountId}"`
            },
            auth
        });
    }
    catch (error) {
        res.status(500).json({error: error.message})
        throw new Error(error.message)
    }
}

exports.checkUserExists = async (res, email) => {
    try {
        const response = await axios.get(`${URL}/rest/api/3/user/search`, {
            params: {
                query: email
            },
            auth
        });
        if (response.data.length > 0) {
            return response.data[0];
        } else {
            return null;
        }
    } catch (error) {
        res.status(500).json({error: error})
        throw new Error(error)
    }
};

exports.addUserToJira = async (res, email) => {
    try {
        const response = await axios.post(`${URL}/rest/api/3/user`, {
            emailAddress: email,
        }, {auth});
        return response.data;
    } catch (error) {
        res.status(500).json({ error: error.message });
        throw new Error(error.message)
    }
};

exports.createIssue = async (res, issueDetails, reporterId) => {
    try {
        const response = await axios.post(`${URL}/rest/api/3/issue`, createJiraIssueOptions(project, issueDetails, reporterId), {auth});
        return response.data;
    } catch (error) {
        res.status(500).json({error: error.message});
        console.log('err -> ', error.message);
        throw new Error(error.message)
    }
};

exports.JiraItemToDTO = (jiraItem) => {
    return {
        id: jiraItem.id,
        title: jiraItem.fields.summary,
        description: jiraItem.fields.description?.content[0].content[0].text,
        status: jiraItem.fields.status.name,
        priority: jiraItem.fields.priority.name,
    };
};