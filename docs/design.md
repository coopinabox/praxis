## workflow

1. persons plan possible actions in organization
2. persons assign weights to actions based on preference
3. persons assign weights to time ranges based on availability
4. organization requests action offer to persons
5. person executes offer by completing action
6. other person validates completed action
7. upon validation, person receives reward

## schemas

```yml

Agent:
  - id
  - resources: hasMany(Resource)
  - requests: hasMany(Request)
  - actionHistory: hasMany(Action, 'completedBy')
  
Person < Agent:
  - name
  - actionWeights: hasMany(ActionWeight)
  - momentWeights: hasMany(MomentWeight)
  
Organization < Agent:
  - name

Unit:
  - id
  - name: string
  - description: string
  - resources: hasMany(Resource)
  - maintenance: hasMany(Action)

Resource:
  - id
  - unit: belongsTo(Unit)
  - quantity: number
  - maintenance: hasMany(Action).through(Unit)

Action:
  - id
  - resource: belongsTo(Resource)
  - completedBy: Agent
  - name: string
  - description: [string]
  - duration: duration (time quantity)

MomentWeight:
  - start: time
  - end: time
  - weight: number
  - by: belongsTo(Agent)

ActionWeight:
  - action: belongsTo(Action)
  - weight: number
  - by: belongsTo(Agent)

Request:
  - id
  - requestee: belongsTo(Agent)
  - action: belongsTo(Action)
  - reward: belongsToMany(Resource)
  - start: time
  - *end: start + action.duration
```
