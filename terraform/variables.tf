
variable "ENVIRONMENT" {
  type    = string
  default = "development"
}

variable "AWS_REGION" {
  default = "eu-west-3"
}

variable "INSTANCE_TYPE" {
  default = "t2.micro"
}
