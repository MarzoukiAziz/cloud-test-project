
terraform {
  backend "s3" {
    bucket = "terraform-state-43a1"
    key    = "projects-ecs/terraform-state/terraform.tfstate"
    region = "eu-west-3"
  }
}
module "projects-vpc" {
  source      = "./module/vpc"
  ENVIRONMENT = var.ENVIRONMENT
  AWS_REGION  = var.AWS_REGION
}

module "projects-server" {
  source = "./server"

  ENVIRONMENT         = var.ENVIRONMENT
  AWS_REGION          = var.AWS_REGION
  vpc_private_subnet1 = module.projects-vpc.private_subnet1_id
  vpc_private_subnet2 = module.projects-vpc.private_subnet2_id
  vpc_id              = module.projects-vpc.my_vpc_id
  vpc_public_subnet1  = module.projects-vpc.public_subnet1_id
  vpc_public_subnet2  = module.projects-vpc.public_subnet2_id


}

#Define Provider
provider "aws" {
  region = var.AWS_REGION
}

output "load_balancer_output" {
  description = "Load Balancer"
  value       = module.projects-server.load_balancer_output
}
