variable "AWS_REGION" {
  type    = string
  default = "eu-west-3"
}

variable "BACKUP_RETENTION_PERIOD" {
  default = "7"
}

variable "PUBLICLY_ACCESSIBLE" {
  default = "true"
}

variable "PROJECTS_RDS_USERNAME" {
  default = "projects_admin"
}

variable "PROJECTS_RDS_PASSWORD" {
  default = "projects_admin_password"
}

variable "PROJECTS_RDS_ALLOCATED_STORAGE" {
  type    = string
  default = "20"
}

variable "PROJECTS_RDS_ENGINE" {
  type    = string
  default = "postgres"
}

variable "PROJECTS_RDS_ENGINE_VERSION" {
  type    = string
  default = "16.6"
}

variable "DB_INSTANCE_CLASS" {
  type    = string
  default = "db.t3.small"
}

variable "RDS_CIDR" {
  description = "The CIDR block for the VPC"
  type        = string
  default     = "0.0.0.0/0"
}

variable "ENVIRONMENT" {
  description = "AWS VPC Environment Name"
  type        = string
  default     = "Development"
}

variable "vpc_private_subnet1" {
  description = "AWS VPC Environment Name"
  type        = string
  default     = ""
}

variable "vpc_private_subnet2" {
  description = "AWS VPC Environment Name"
  type        = string
  default     = ""
}

variable "vpc_id" {
  description = "AWS VPC Environment Name"
  type        = string
  default     = ""
}

