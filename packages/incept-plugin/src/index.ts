import { Application } from 'inceptjs'
import { middleware } from 'eventrpc'

export default function(app: Application) {
  app.use(middleware(app))
  app.withReact.layout(
    'default', 
    `${__dirname}/Layout/StaticLayout`,
    `${__dirname}/Layout/ServerLayout`
  )
}