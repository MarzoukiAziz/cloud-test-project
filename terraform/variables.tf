variable "region" {
  description = "The AWS region"
  type        = string
  default     = "eu-west-3"
}

variable "availability_zones" {
  description = "The AWS availability zones to create resources in"
  type        = list(string)
  default     = ["eu-west-3a", "eu-west-3b"]
}

variable "app_name" {
  description = "The name of the application"
  type        = string
}

variable "ecs_cluster_name" {
  description = "The name of the ECS cluster"
  type        = string
}

variable "container_image" {
  description = "The Docker image to use for the application"
  type        = string
}

variable "app_port" {
  description = "The port on which the application runs"
  type        = number
  default     = 80
}

variable "ecs_task_cpu" {
  description = "The number of CPU units for the ECS task"
  type        = number
  default     = 256
}

variable "ecs_task_memory" {
  description = "The amount of memory (in MiB) for the ECS task"
  type        = number
  default     = 512
}

variable "db_instance_type" {
  description = "The instance type for the RDS database"
  type        = string
  default     = "db.t3.micro"
}

variable "db_name" {
  description = "The name of the RDS database"
  type        = string
  default     = "ecs_database"
}

variable "db_username" {
  description = "The username for the RDS database"
  type        = string
  default     = "admin"
}

variable "db_password" {
  description = "The password for the RDS database"
  type        = string
  sensitive   = true
}

variable "terraform_state_bucket" {
  description = "The S3 bucket name for Terraform state storage"
  type        = string
  default     = "projects-terraform-state-bucket2O24"
}
