## workflow

1. child holons plan possible actions in parent holon
2. holons assign weights to actions based on preference
3. holons assign weights to time ranges based on availability
4. parent holon request action offer to child holons
5. child holon executes offer by completing action
6. other holons validate completed action
7. upon validation, holon receives reward

## schemas

```yml

Holon:
  - id
  - children: belongsToMany(Holon).through(Edge)
  - parents: belongsToMany(Holon).through(Edge)
  - actionWeights: hasMany(ActionWeight)
  - momentWeights: hasMany(MomentWeight)
  - resources: hasMany(Resource)
  - requests: hasMany(Request)
  - actionHistory: hasMany(Action, 'completedBy')

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
  - completedBy: Holon
  - name: string
  - description: [string]
  - duration: duration (time quantity)

MomentWeight:
  - start: time
  - end: time
  - weight: number
  - holon: belongsTo(Holon)

ActionWeight:
  - action: belongsTo(Action)
  - weight: number
  - holon: belongsTo(Holon)

Request:
  - id
  - requestee: belongsTo(Holon)
  - action: belongsTo(Action)
  - reward: belongsToMany(Resource)
  - start: time
  - *end: start + action.duration
```
