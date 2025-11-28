declare module '@vtex/shoreline/css' {
    const classes: { [key: string]: string }
    export default classes
}

declare module '*.css' {
    const classes: { [key: string]: string }
    export default classes
}