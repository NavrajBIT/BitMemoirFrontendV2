# Setup

Create a .env.local file at the root directory
NEXT_PUBLIC_API_ENDPOINT=
NEXT_PUBLIC_GOOGLE_KEY=
NEXT_PUBLIC_FACEBOOK_KEY=

# Coding Starndards

## Folder structure

- Config/env file should be present in the root directory for global variables.
- Nested depth should be <= 5

### app folder:

- Every subfolder is also a navigation route. So name the subfolders appropriately.
- Every page.js file should import one component and export the same
- Every page should have its own header
- Use layout.js for pages with shared layout

### components folder:

- Every subfolder should should corrospond to a route in the app folder.
- The default file in every subfolder should only be an assembly of different components.
- The subcomponents folder should have components shared by different pages/parent components

### public folder:

- All assets like images, videos, icons etc should be kept in the public folder.
- The assets should be categorized into sub folders.

## Filenames

- Filenames should use camelcase
- JSX components should have .jsx extension
- hooks and scripting files should have .js extension

## Component design

- react components should not be of more that 50 lines.
- components with big functions should be divided into functional and rendering components.
- client side and server side components should be separate.
- every function should have only one job and should not have more than 3 parameters.
- There should be no code repetition. Shared functions should be inside the subcomponents folder.
- Next js default components like <Link>, <Image> etc should be used wherever possible.
- No hard-coded values. The values must be imported from config/env file from the root directory.
- Custom components should be used as much as possible, instead of ready-made libraries.
- Use camelCase for variable names.
- Code comments should be generic and should provide the overall logic, while variable names should be specific and self-expanatory.

## Styling

- Global variables like color pallette, margin/padding, base font size etc should be declared in the global css file.
- Font size should always be relative
- CSS preference => Inline CSS > Local CSS > Global CSS
- Avoid reusable styling/ classes. Instead create reusable components. e.g. For a button component, instead of specifying global css class, create a button component with local css that can be imported inside other components.
- Native css should be preferred over tailwind.
- Custom styling should be preferred over styling libraries.

## API calls

- Use NEXTjs default API routes. The actual API calls should be handled inside these API routes.

## Version control

- Commits should be done frequently, Ideally after every feature completion.
- Commit messages should be descriptive about the functionality and should not describe the actual change.
- Commits should be pushed to testing and temporary branches only. Staging and Production branches are reserved for merges only.

## Testing

- Every component/feature must be tested thoroughly, considering all the edge cases.
- Unit tests must be written after every feature execution.
- Performance testing and optimization is a must for every page.
