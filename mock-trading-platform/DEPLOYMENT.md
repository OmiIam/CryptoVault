# Production Deployment Guide

## Overview
This guide covers deploying the Mock Trading Platform to production using Docker and Docker Compose.

## Prerequisites
- Docker and Docker Compose installed
- Domain name and SSL certificates
- At least 2GB RAM and 10GB storage

## Quick Start

1. **Clone and prepare the repository:**
   ```bash
   git clone <your-repo>
   cd mock-trading-platform
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env with your production values
   ```

3. **Create necessary directories:**
   ```bash
   mkdir -p data ssl
   ```

4. **Add SSL certificates:**
   ```bash
   # Copy your SSL certificate and key to the ssl directory
   cp /path/to/your/cert.pem ssl/
   cp /path/to/your/private.key ssl/
   ```

5. **Update configuration files:**
   - Update `nginx.conf` with your domain name
   - Update environment variables in `.env`

6. **Deploy:**
   ```bash
   docker-compose up -d
   ```

## Environment Variables

### Required Variables
- `JWT_SECRET`: Secure random string for JWT tokens
- `FRONTEND_URL`: Your frontend domain (https://your-domain.com)
- `NEXT_PUBLIC_API_URL`: Your API domain (https://your-api-domain.com/api)

### Optional Variables
- `PORT`: Backend port (default: 5000)
- `DB_PATH`: Database file path (default: ./data/trading_platform.db)
- `NODE_ENV`: Environment (production)

## Security Considerations

1. **JWT Secret**: Use a cryptographically secure random string
2. **SSL/TLS**: Always use HTTPS in production
3. **Rate Limiting**: Configured in nginx.conf
4. **CORS**: Properly configured for your domains
5. **Security Headers**: Implemented in both Next.js and Nginx

## Database

The application uses SQLite with:
- Automatic table creation
- Data persistence via Docker volumes
- Health checks for connection monitoring

## Monitoring and Health Checks

### Health Endpoints
- Backend: `GET /api/health` - Database and service status
- Frontend: `GET /api/health` - Service status
- Readiness: `GET /api/ready` - Database initialization status

### Docker Health Checks
All services include health checks with:
- 30-second intervals
- 3 retry attempts
- Automatic restart on failure

## Scaling and Performance

### Single Server Deployment
The current setup is optimized for single-server deployment with:
- Docker Compose orchestration
- Nginx reverse proxy
- Automatic service restarts
- Volume persistence

### For High Availability
Consider:
- Load balancers
- Database clustering
- Container orchestration (Kubernetes)
- CDN for static assets

## Backup Strategy

### Database Backup
```bash
# Create backup
docker-compose exec backend sqlite3 /app/data/trading_platform.db ".backup /app/data/backup-$(date +%Y%m%d).db"

# Copy backup out of container
docker cp $(docker-compose ps -q backend):/app/data/backup-$(date +%Y%m%d).db ./backups/
```

### Full System Backup
```bash
# Backup data directory
tar -czf backup-$(date +%Y%m%d).tar.gz data/
```

## Troubleshooting

### Check Service Status
```bash
docker-compose ps
docker-compose logs [service-name]
```

### Database Issues
```bash
# Check database connectivity
curl -f http://localhost:5000/api/health

# Access database directly
docker-compose exec backend sqlite3 /app/data/trading_platform.db
```

### SSL Issues
- Verify certificate paths in nginx.conf
- Check certificate validity: `openssl x509 -in ssl/cert.pem -text -noout`
- Ensure certificates are readable by nginx container

## Production Checklist

- [ ] Environment variables configured
- [ ] SSL certificates installed
- [ ] Domain names updated in configs
- [ ] Database directory created
- [ ] Nginx configuration updated
- [ ] Health checks responding
- [ ] Backup strategy implemented
- [ ] Monitoring set up
- [ ] Security headers verified
- [ ] Rate limiting tested

## Support

For issues or questions:
1. Check the logs: `docker-compose logs`
2. Verify health endpoints
3. Review this deployment guide
4. Check Docker and system resources