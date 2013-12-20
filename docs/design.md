## workflow

1. beings plan possible actions in spaces
2. beings assign weights to actions based on preference
3. beings assign weights to time ranges based on availability
4. spaces assign weights to actions based on need
5. space request action offer to beings in space
6. being executes offer by completing action
7. other beings validate completed action
8. upon validation, being receives reward

## schemas

```yml

where
  @ is an indexed property
  * is a computed property

Being:
  - @id
  - nick: string
  - spaces: [Space]
  - preferences: { Action: weight }
  - availability: { MomentRange: weight }
  - resources: { unit: quantity }
  - *upcoming: [Offer]
  - *history: [Action]

Space:
  - @id
  - topic: string
  - beings: [Being]
  - need: { Action: weight }

Action:
  - @id
  - @space: Space
  - name: string
  - instructions: [string]
  - duration: Duration (http://momentjs.com/docs/#/durations/)

Offer:
  - @id
  - @being: Being
  - action: Action
  - reward: (unit, quantity)
  - timeStart: Moment (http://momentjs.com/)
  - *timeRange: MomentRange

MomentRange: http://gf3.github.io/moment-range/
  - start
  - end

```
