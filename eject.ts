import fs from 'fs'
import path from 'path'

const files = ['./next.config.js', './next-env.d.ts', './redirects.js']
const directories = ['./src/app']

const eject = async (): Promise<void> => {
  files.forEach(file => {
    fs.unlinkSync(path.join(__dirname, file))
  })

  directories.forEach(directory => {
    fs.rm(path.join(__dirname, directory), { recursive: true }, err => {
      if (err) throw err
    })
  })

  const serverFile = path.join(__dirname, './src/server.ts')
  const serverDefaultFile = path.join(__dirname, './src/server.default.ts')
  fs.copyFileSync(serverDefaultFile, serverFile)

  const eslintConfigFile = path.join(__dirname, './.eslintrc.js')
  const eslintConfig = fs.readFileSync(eslintConfigFile, 'utf8')
  const updatedEslintConfig = eslintConfig.replace(`'plugin:@next/next/recommended', `, '')
  fs.writeFileSync(eslintConfigFile, updatedEslintConfig, 'utf8')
}

eject()