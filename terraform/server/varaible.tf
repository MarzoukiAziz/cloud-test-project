variable "SSH_CIDR_WEB_SERVER" {
  type    = string
  default = "0.0.0.0/0"
}

variable "INSTANCE_TYPE" {
  default = "t2.micro"
}

variable "AWS_REGION" {
  type    = string
  default = "us-east-2"
}

variable "ENVIRONMENT" {
  description = "AWS VPC Environment Name"
  type        = string
  default     = "Development"
}

variable "public_key_path" {
  description = "Public key path"
  default     = "~/.ssh/levelup_key.pub"
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


variable "vpc_public_subnet1" {
  description = "AWS VPC Environment Name"
  type        = string
  default     = ""
}

variable "vpc_public_subnet2" {
  description = "AWS VPC Environment Name"
  type        = string
  default     = ""
}

variable "container_image" {
  description = "Application docker image"
  type        = string
  default     = "864899850389.dkr.ecr.eu-west-3.amazonaws.com/projects-repo:latest"
}
