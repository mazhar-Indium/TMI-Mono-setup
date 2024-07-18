export enum checkStatus {
    Approved = 1,
    Pending = 2,
    Rejected = 3,
    Deleted = 4,
    InProgress = 5,
    Draft = 6
  }

  

export enum userGroupStatus {
  inactive = 1,
  
}
//this is a hardcoded value as of now to send a mail to everyone it will be changed if client 
//says that every company will be configured for email, then remove this for sending email for
//the respective company otherwise make sure in the table email configuration must have a value 
//configured with company id = 1
export const mainCompanyId = 1;