export class DuplicatedResourceError extends Error {
  constructor(resourceName: string){
    super(
      `Duplicated [${resourceName}] resource`
    )
  }
} 
