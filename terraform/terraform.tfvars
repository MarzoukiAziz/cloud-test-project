region             = "eu-west-3"
availability_zone  = "eu-west-3a"
app_name           = "projects-api"
ecs_cluster_name   = "projects-cluster"
container_image    = "864899850389.dkr.ecr.eu-west-3.amazonaws.com/projects-repo:latest"
app_port           = 80
ecs_task_cpu       = 512
ecs_task_memory    = 1024

db_instance_type   = "db.t3.small"
db_name            = "projects_db"
db_username        = "admin"
db_password        = "very_secured_password"

terraform_state_bucket = "projects-terraform-state-bucket2O24"
