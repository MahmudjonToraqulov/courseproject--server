exports.createJiraIssueOptions = (project, issueDetails, reporterId)=>{
    const {summary, description, priority} = issueDetails
    return {
        fields: {
            project: {
                key: project
            },
            summary,
            description: {
                type: 'doc',
                version: 1,
                content: [
                    {
                        type: 'paragraph',
                        content: [
                            {
                                type: 'text',
                                text: description
                            }
                        ]
                    }
                ]
            },
            issuetype: {
                name: 'Task'
            },
            reporter: {
                id: reporterId
            },
            priority: {
                name: priority
            }
        }
    }
}