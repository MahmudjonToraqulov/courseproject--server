const {checkUserExists, addUserToJira, createIssue, getTasks, JiraItemToDTO} = require("../utils/handleControllers/jiraUtils");

const jiraController = {
    getTasksByEmail: async (req, res)=>{
        let user = await checkUserExists(res, req.params.email)
        if (!user) return res.status(200).json([])
        let response = await getTasks(res, user)
        response = response.data.issues.map(item=>JiraItemToDTO(item))
        res.status(200).json(response)
    },
    
    createJiraTask: async (req, res)=>{
        const {email, issueDetails} = req.body;
        let user = await checkUserExists(res, email);
        if (!user) user = await addUserToJira(res, email);
        const issue = await createIssue(res, issueDetails, user.accountId);
        res.status(200).json(issue)
    }
}

module.exports = jiraController