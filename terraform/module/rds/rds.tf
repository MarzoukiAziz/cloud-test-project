#Define Subnet Group for RDS Service
resource "aws_db_subnet_group" "projects-rds-subnet-group" {
  name        = "${var.ENVIRONMENT}-projects-rds-snet"
  description = "Allowed subnets for DB cluster instances"
  subnet_ids = [
    "${var.vpc_private_subnet1}",
    "${var.vpc_private_subnet2}",
  ]
  tags = {
    Name = "${var.ENVIRONMENT}_projects_db_subnet"
  }
}

#Define Security Groups for RDS Instances
resource "aws_security_group" "projects-rds-sg" {

  name        = "${var.ENVIRONMENT}-projects-rds-sg"
  description = "projects-rds-sg"
  vpc_id      = var.vpc_id

  ingress {
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = ["${var.RDS_CIDR}"]

  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "${var.ENVIRONMENT}-projects-rds-sg"
  }
}

resource "aws_db_instance" "projects-rds" {
  identifier              = "projects-rds-${var.ENVIRONMENT}"
  allocated_storage       = var.PROJECTS_RDS_ALLOCATED_STORAGE
  storage_type            = "gp2"
  engine                  = var.PROJECTS_RDS_ENGINE
  engine_version          = var.PROJECTS_RDS_ENGINE_VERSION
  instance_class          = var.DB_INSTANCE_CLASS
  backup_retention_period = var.BACKUP_RETENTION_PERIOD
  publicly_accessible     = var.PUBLICLY_ACCESSIBLE
  username                = var.PROJECTS_RDS_USERNAME
  password                = var.PROJECTS_RDS_PASSWORD
  vpc_security_group_ids  = [aws_security_group.projects-rds-sg.id]
  db_subnet_group_name    = aws_db_subnet_group.projects-rds-subnet-group.name
  multi_az                = "false"
  db_name                 = "projects-db"
}

output "rds_prod_endpoint" {
  value = aws_db_instance.projects-rds.endpoint
}
