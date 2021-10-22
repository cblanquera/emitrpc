import { Application } from 'inceptjs'
import { middleware } from 'emitrpc'

export default function(app: Application) {
  app.use(middleware(app))
  app.withReact.layout(
    'default', 
    `${__dirname}/Layout/StaticLayout`,
    `${__dirname}/Layout/ServerLayout`
  )
}