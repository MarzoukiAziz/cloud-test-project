module "projects-rds" {
  source              = "../module/rds"
  ENVIRONMENT         = var.ENVIRONMENT
  AWS_REGION          = var.AWS_REGION
  vpc_private_subnet1 = var.vpc_private_subnet1
  vpc_private_subnet2 = var.vpc_private_subnet2
  vpc_id              = var.vpc_id
}

# Define ECS Cluster
resource "aws_ecs_cluster" "server_cluster" {
  name = "${var.ENVIRONMENT}-server-cluster"
}

# Define ECS Task Definition
resource "aws_ecs_task_definition" "server_task" {
  family                   = "${var.ENVIRONMENT}-server-task"
  requires_compatibilities = ["FARGATE"]
  network_mode             = "awsvpc"
  cpu                      = "256"
  memory                   = "512"
  execution_role_arn       = aws_iam_role.ecs_task_execution_role.arn

  container_definitions = jsonencode([
    {
      name      = "server-container"
      image     = var.container_image
      memory    = 512
      cpu       = 256
      essential = true
      portMappings = [
        {
          containerPort = 80
          hostPort      = 80
        }
      ]
    }
  ])
}

# Define IAM Role for ECS Tasks
resource "aws_iam_role" "ecs_task_execution_role" {
  name = "${var.ENVIRONMENT}-ecs-task-execution-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "ecs-tasks.amazonaws.com"
        }
      }
    ]
  })
}

# Attach policies to ECS Task Role
resource "aws_iam_role_policy_attachment" "ecs_task_execution_role_policy" {
  role       = aws_iam_role.ecs_task_execution_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}

# Define ECS Service
resource "aws_ecs_service" "server_service" {
  name            = "${var.ENVIRONMENT}-server-service"
  cluster         = aws_ecs_cluster.server_cluster.id
  task_definition = aws_ecs_task_definition.server_task.arn
  desired_count   = 2
  launch_type     = "FARGATE"

  network_configuration {
    subnets          = [var.vpc_public_subnet1, var.vpc_public_subnet2]
    security_groups  = [aws_security_group.projects_server_alb.id]
    assign_public_ip = true
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.load_balancer_target_group.arn
    container_name   = "server-container"
    container_port   = 80
  }

  depends_on = [aws_lb_listener.server_listener]
}

# Application Load Balancer
resource "aws_lb" "projects_load_balancer" {
  name               = "${var.ENVIRONMENT}-projects-lb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.projects_server_alb.id]
  subnets            = [var.vpc_public_subnet1, var.vpc_public_subnet2]
}

# Add ALB Target Group
resource "aws_lb_target_group" "load_balancer_target_group" {
  name        = "${var.ENVIRONMENT}-ecs-target-group"
  port        = 80
  protocol    = "HTTP"
  vpc_id      = var.vpc_id
  target_type = "ip"
}

# HTTP Listener for ALB
resource "aws_lb_listener" "server_listener" {
  load_balancer_arn = aws_lb.projects_load_balancer.arn
  port              = 80
  protocol          = "HTTP"

  default_action {
    target_group_arn = aws_lb_target_group.load_balancer_target_group.arn
    type             = "forward"
  }
}
output "load_balancer_output" {
  description = "Load Balancer"
  value       = aws_lb.projects_load_balancer.dns_name
}
